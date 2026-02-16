import Order from "../models/orderModel.js";
import Book from "../models/bookModel.js";
// import Stripe from "stripe";
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { logActivity } from "../utils/logActivity.js";
import admin from "../config/firebaseAdmin.js";
import adminModel from "../models/adminModel.js";

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

//CREATE A ORDER
export const createOrder = async (req, res, next) => {
  try {
    const {customer, items, paymentMethod, notes, deliveryDate } = req.body;

    if(!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty items array' })
    }

        const normalizedPM = ['Cash on Delivery', 'Online Payment'].includes(paymentMethod) ? paymentMethod : 'Online Payment'
        const orderId = `ORD-${uuidv4()}` 
        const totalAmount = items.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0);
        const taxAmount = +((totalAmount * 0.05).toFixed(2));
        const shippingCharge = 0;

        // 4. Map customer → shippingAddress
        const shippingAddress = {
            fullName: customer.name,
            email: customer.email,
            phoneNumber: customer.phone,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zip,
        };

        const orderItems = await Promise.all(items.map(async (i) => {
          const bookDoc = await Book.findById(i.id).lean();

          if(!bookDoc) {
            const err = new Error(`Book not found: ${i.id}`)
            err.status = 400
            throw err
          }

           return {
                book: bookDoc._id,
                title: bookDoc.title,
                author: bookDoc.author,
                image: bookDoc.image,
                price: Number(i.price),
                quantity: Number(i.quantity),
            }; 
        }))

        // Base payload
        const baseOrderData = {
            orderId,
            user: req.user._id,
            shippingAddress,
            book: orderItems,
            shippingCharge,
            totalAmount,
            taxAmount,
            paymentMethod: normalizedPM,
            notes,
            deliveryDate,
        };

        //forstripe
        //Online Payment
        // if(normalizedPM === "Online Payment" ) {
        //   const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     mode: 'payment',
        //     line_items: items.map(o => ({
        //       price_data: {
        //         currency: 'ngn',
        //         product_data: {name: o.name},
        //         unit_amount: Math.round(o.price)
        //       },
        //       quantity: o.quantity
        //     })),
        //     customer_email: customer.email,
        //     success_url: `${process.env.FRONTEND_URL}/orders/verify?session_id={CHECKOUT_SESSION_ID}`,
        //     cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
        //     metadata: { orderId }
        //   });

        //   const newOrder = new Order({
        //     ...baseOrderData,
        //     paymentStatus: 'Unpaid',
        //     sessionId: session.id,
        //     paymentIntentId: session.payment_intent

        //   })
        //   await newOrder.save()
        //   return res.status(201).json({order: newOrder, checkoutUrl: session.url})
        // }

        //for paystack

        if (normalizedPM === "Online Payment") {
          try {
            // Prepare the total amount in kobo (Paystack requires lowest unit)
            const amountInKobo = Math.round(items.reduce((acc, o) => acc + o.price * o.quantity, 0) * 100);

            // Create Paystack transaction
            const { data } = await axios.post(
              'https://api.paystack.co/transaction/initialize',
              {
                email: customer.email,
                amount: amountInKobo,
                metadata: { orderId },
                callback_url: `${process.env.FRONTEND_URL}/orders/verify`
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            const newOrder = new Order({
              ...baseOrderData,
              paymentStatus: 'Unpaid',
              paystackReference: data.data.reference // store reference for verification
            });

            await newOrder.save();

            return res.status(201).json({
              order: newOrder,
              checkoutUrl: data.data.authorization_url
            });

          } catch (err) {
            console.error("Paystack transaction init error:", err.response?.data || err);
            return res.status(500).json({ error: "Payment initialization failed" });
          }
        }

        //cash on delivery
        const newOrder = new Order({
          ...baseOrderData,
        })
        await newOrder.save()

        return res.status(201).json({ order: newOrder, checkoutUrl: null})
  } catch (error) {
      next(error)
  }
}


//confirm stripe payment

export const confirmPayment = async (req, res, next) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ message: 'reference required' });
    }

    // Verify payment with Paystack
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      }
    );

    if (data.data.status !== 'success') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Update order in DB
    const order = await Order.findOneAndUpdate(
      { paystackReference: reference },
      { paymentStatus: 'Paid' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });

  } catch (err) {
    console.error("Paystack verification error:", err.response?.data || err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getOrders = async (req, res, next) => {
  try {
    const { search = '', status} = req.query;
    const filter = {};
    if (status) filter.orderStatus = status

    if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [
                { orderId: regex },
                { 'shippingAddress.fullName': regex },
                { 'shippingAddress.email': regex },
                { 'books.title': regex }
            ];
        }

         const orders = await Order.find(filter)
            .sort({ placedAt: -1 })
            .lean();

                    // Compute aggregate counts
        const counts = orders.reduce((acc, o) => {
            acc.totalOrders = (acc.totalOrders || 0) + 1;
            acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
            if (o.paymentStatus === 'Unpaid') {
                acc.pendingPayment = (acc.pendingPayment || 0) + 1;
            }
            return acc;
        }, { totalOrders: 0, pendingPayment: 0 });

        res.json({
            counts: {
                totalOrders: counts.totalOrders,
                pending: counts.Pending || 0,
                processing: counts.Processing || 0,
                shipped: counts.Shipped || 0,
                delivered: counts.Delivered || 0,
                cancelled: counts.Cancelled || 0,
                pendingPayment: counts.pendingPayment
            },
            orders
        });
  } catch (error) {
    next(error)
  }
}

//get order by id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).lean()
    if(!order) {
      return res.status(404).json({ message: 'Order not found'})
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
}

//get user orders
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id}).populate('book.book').sort({createdAt: -1})
    res.status(200).json(orders)
  } catch (error) {
    console.error('Get users orders error', error)
    res.status(500).json({ error: 'Failed to fetch user order'})
    next(error)
  }
}

//update order 
export const updateOrder = async (req, res, next) => {
  try {
    const allowed = ['orderStatus', 'paymentStatus', 'deliveryDate', 'notes']
    const updateData = {}
    allowed.forEach(field => {
      if(req.body[field] !== undefined) updateData[field] = req.body[field];
    })

    const existingOrder = await Order.findById(req.params.id);

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updated = await Order.findByIdAndUpdate(req.params.id, updateData, {new: true, runValidators: true}).lean();

    await logActivity({
      adminId: req.admin._id,  
      action: 'UPDATED ORDER',
      entityType: 'order',
      entityId: updated._id,
      details: {
        user: existingOrder.shippingAddress.fullName,
        userEmail: existingOrder.shippingAddress.email,
        adminName: req.admin.name,
        adminEmail: req.admin.email,
        orderId: updated.orderId,
        paymentStatus: existingOrder.paymentStatus,
        previousStatus: existingOrder.orderStatus,
        newStatus: updated.orderStatus,
      }
    });
    if(!updated) {
      res.status(400).json({ message: 'Order not found'})
    }
    res.json(updated)
  } catch (error) {
    next(error)
  }
} 

export const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id).lean()
    if(!deleted) {
      return res.status(404).json({ message: 'Order not found'})
    }
    res.json({ message: 'Message deleted successfully'})
  } catch (error) {
    next(error)
  }
}