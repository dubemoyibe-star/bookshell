import cartModel from "../models/cartModel.js";
import Book from "../models/bookModel.js";

//add to cart 
export async function addToCart(req, res) {
  const {bookId, quantity} = req.body

  if(!bookId || !quantity || quantity < 1){
    return res.status(400).json({success: false, message: 'Book id and valid quantity are required'})
  }

  try {
    const book = await Book.findById(bookId)
    if(!book) {
      return res.status(404).json({ success: false, message: 'Book not found'})
    }
    let cart = await cart.findOne({ user: req.user._id})
    if(!cart) {
      cart = await cartModel.create({
        user: req.user._id,
        items: [{ book: bookId, quantity}]
      })
    }else {
      const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId)
      if(itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity
      }else {
        cart.items.push({ book: bookId, quantity})
      }

      await cart.save()
    }
    res.status(200).json({ success: true, message: 'Item added to cart', cart})
  } catch (error) {
    res.status(500).json({success: false, message: 'Error adding to cart', error: error.message})
  }
}

export  async function getCart(req, res) {
  try {
    const cart = await cartModel.findOne({ user: req.user._id}).populate({ path: 'items.book', model: 'Book'})
    if(!cart || cart.items.length === 0) {
      res.status(200).json({ 
        success: true, 
        cart: { items: [], totalAmount: 0, tax: 0, shipping: 0, finalAmount: 0}
      })
    }
    let totalAmount = 0
    const taxRate = 0.1
    const shipping = 50

    cart.items.forEach(({book, quantity}) => {
      totalAmount += (book?.price || 0) * quantity
    })

    const tax = parseFloat((totalAmount * taxRate).toFixed(2))
    const finalAmount = parseFloat((totalAmount * tax * shipping).toFixed(2))

    res.status(200).json({
      success: true,
      cart,
      summary: {totalAmount, tax, shipping, finalAmount}
     })
  } catch (error) {
    res.status(500).json({success: false, message: 'Error retrieving cart', error: error.message})
  }
}

export async function updateCartItem(req, res) {
  const { bookId, quantity} = req.body;

  if(!bookId || quantity < 1)
    res.status(400).json({ success: false, message: 'Valid book id and quantity required'})

  try {
   const cart = await cartModel.findOne({user: req.user._id});
   if(!cart) {
    return res.status(404).json({success: false, message: 'Cart not found'})
   }

   const item = cart.items.find(item => item.book.toString() === bookId)
   if(!item) {
    return res.status(404).json({ success: false, message: 'Item not found in the cart'})
   }

   item.quantity = quantity
   await cart.save()
   res.status(200).json({ success: true, message: 'Cart Updated', cart})

  } catch (error) {
    res.status(500).json({success: false, message: 'Error updating cart items', error: error.message})
  }
}

export async function removeCartItem(req, res) {
  const { bookId } = req.params;

  try {
  const cart = await cartModel.findOne({user: req.user._id});
   if(!cart) {
    return res.status(404).json({success: false, message: 'Cart not found'})
   }

   cart.items = cart.items.filter(item => item.book.id !== bookId)
   await cart.save()
   res.status(200).json({ success: true, message: 'Item removed', cart})

  } catch (error) {
     res.status(500).json({success: false, message: 'Error deleting cart items', error: error.message})
  }
}

export async function clearUserCart(req, res) {
  const userId = req.user._id
  try {
    const cart = await cartModel.findOne({user: userId });
    if(!cart) {
      return res.status(404).json({success: false, message: 'Cart not found'})
    }

    cart.items = []
    await cart.save()
    res.status(200).json({success: true, message: 'Cart cleared successfully'})

  } catch (error) {
     res.status(500).json({success: false, message: 'Error deleting cart', error: error.message})
  }
}