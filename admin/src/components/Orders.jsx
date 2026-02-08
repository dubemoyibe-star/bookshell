import React, { useEffect, useState, useMemo } from 'react'
import { 
  Search, ChevronDown, ChevronUp, Truck, CreditCard, DollarSign, 
  CheckCircle, Clock, AlertCircle, BookOpen, User, MapPin, 
  Mail, Phone, Edit, X, Package, RefreshCw 
} from "lucide-react";
import axios from 'axios'
 const API_BASE = import.meta.env.VITE_API_BASE

 const statusOptions = [
   {
     value: "Pending",
     label: "Pending",
     icon: Clock,
     color: "bg-yellow-100 text-yellow-800",
     iconColor: "text-yellow-500",
   },
   {
     value: "Processing",
     label: "Processing",
     icon: RefreshCw,
     color: "bg-blue-100 text-blue-800",
     iconColor: "text-blue-500",
   },
   {
     value: "Shipped",
     label: "Shipped",
     icon: Truck,
     color: "bg-indigo-100 text-indigo-800",
     iconColor: "text-indigo-500",
   },
   {
     value: "Delivered",
     label: "Delivered",
     icon: CheckCircle,
     color: "bg-green-100 text-green-800",
     iconColor: "text-green-500",
   },
   {
     value: "Cancelled",
     label: "Cancelled",
     icon: AlertCircle,
     color: "bg-red-100 text-red-800",
     iconColor: "text-red-500",
   },
 ];

 const tabs = [
  {id: 'all', label: 'All Orders'},
  ...statusOptions.map((o) => ({id: o.value, label: o.label}))
 ]

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [counts, setCounts] = useState({ totalOrders: 0, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, pendingPayment: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = {
          ...(searchTerm && { search: searchTerm}),
          ...(activeTab !== 'all' && { status: activeTab}),
        }
        const {data} = await axios.get(`${API_BASE}/api/order`, { params })
        setOrders(data.orders);
        setCounts(data.counts)
      } catch (error) {
        console.error('Failed to fetch orders', error)
      }
    }
    fetchOrders();
  }, [searchTerm, activeTab])

    const sortedOrders = useMemo(() => {
    if (!sortConfig.key) return orders;
    return [...orders].sort((a, b) => {
      const aVal = sortConfig.key === "date" ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      const bVal = sortConfig.key === "date" ? new Date(b[sortConfig.key]) : b[sortConfig.key];
      return sortConfig.direction === "asc" ? aVal > bVal ? 1 : -1 : aVal > bVal ? -1 : 1;
    });
  }, [orders, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const viewOrder  = async (orderId) => {
    try {
      const {data} = await axios.get(`${API_BASE}/api/order/${orderId}`)
      console.log(data)
      setSelectedOrder(data)
    } catch (error) {
      console.error('Failed to fetch order details', error)
    }
  }

  const updateStatus= async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE}/api/order/${id}`, { orderStatus: newStatus})
      const params = {
          ...(searchTerm && { search: searchTerm}),
          ...(activeTab !== 'all' && { status: activeTab}),
        }
        const {data} = await axios.get(`${API_BASE}/api/order`, { params })
        setOrders(data.orders);
        setCounts(data.counts)

        if(selectedOrder?.id === id) {
          const { data: fresh} = await axios.get(`${API_BASE}/api/order/${id}`)
          setSelectedOrder(fresh)
        }
    } catch (error) {
      console.error('Failed to update order status', error)
    }
  }

      const StatusBadge = ({ status }) => {
      const opt = statusOptions.find(o => o.value === status);
      if (!opt) return null;
      const Icon = opt.icon;
      return (
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${opt.color}`}>
          <Icon className={`w-4 h-4 ${opt.iconColor}`} />
          <span>{opt.label}</span>
        </div>
      );
    };
  
    const stats = [
      { label: "Total Orders", value: counts.totalOrders, icon: Package, color: "bg-indigo-100", iconColor: "text-[#43C6AC]" },
      { label: "Processing", value: counts.processing, icon: RefreshCw, color: "bg-blue-100", iconColor: "text-blue-600" },
      { label: "Delivered", value: counts.delivered, icon: CheckCircle, color: "bg-green-100", iconColor: "text-green-600" },
      { label: "Pending Payment", value: counts.pendingPayment, icon: CreditCard, color: "bg-purple-100", iconColor: "text-purple-600" }
    ];

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl pb-24 mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>Order Management</h1>
          <p className='text-gray-600 mt-1'>Track and manage all customer orders</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, i) => (
            <div key={i} className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>{stat.label}</p>
                  <p className='text-2xl font-bold mt-1 text-gray-900'>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6'>
          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <div className='flex flex-wrap gap-2'>
              {tabs.map(tab => (
                <button key={tab.id} className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                    activeTab === tab.id
                      ? "bg-[#43C6AC] text-white shadow-sm" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}>
                    {tab.label}
                </button>
              ))}
            </div>

            <div className='relative flex-1 max-w-lg'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='w-4 h-4 text-gray-400'/>
              </div>
              <input 
              type='text' 
              placeholder='Search orders, customers or books...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-3 py-2.5 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#43C6AC]'/>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-t-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  {['id', 'customer', 'date', 'amount'].map(key => (
                    <th 
                    key={key} 
                    onClick={() => handleSort(key)}
                    className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group'>
                      <div className='flex items-center'>
                        {key === 'id' ? 'Order ID' : key.charAt(0).toUpperCase() + key.slice(1)}
                        <span className='ml-1 opacity-0 group-hover opacity-100 transition-opacity'>
                          {sortConfig.key ? 
                          (sortConfig.direction === 'asc' ? <ChevronUp className='w-4 h-4'/> : <ChevronDown className='w-4 h-4 text-gray-400'/>)
                        : <ChevronDown className='w-4 h-4 text-gray-400' />}
                        </span>
                      </div>
                    </th>
                  ))}

                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group'>
                    Payment
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group text-right'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {sortedOrders.map(order => (
                  <tr key={order._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#43C6AC]'>{order.orderId}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{order.shippingAddress.fullName}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(order.placedAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>₦{order.finalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            order.paymentMethod === 'Online Payment'
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-orange-100 text-orange-800"
                          }`}>
                        {order.paymentMethod === "Online Payment" ? 
                          <CreditCard className="w-4 h-4" /> : 
                          <DollarSign className="w-4 h-4" />
                        }
                        <span>{order.paymentMethod === "Online Payment" ? "Online" : "COD"}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right'>
                      <button onClick={() => viewOrder(order._id)} className='cursor-pointer px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs hover:bg-indigo-200 transition-colors'>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

              {!sortedOrders.length && (
                <div className='text-center py-12'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
                    <BookOpen className='text-gray-400 w-8 h-8'/>
                  </div>
                  <h3 className='text-lg font-medium text-gray-900 mb-1'>No orders found</h3>
                  <p className='text-gray-500 text-sm'>Try adjusting your search or filters</p>
                </div>
              )}
          </div>
        </div>
              <div className='px-6 py-4 bg-gray-100 rounded-b-xl flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                <div className='text-sm text-gray-600'>
                    Showing <span className='font-medium'>{sortedOrders.length}</span> of {' '}
                    <span className='font-medium'>{counts.totalOrders}</span> orders
                </div>

                <div className='flex gap-4 mt-4 sm:mt-0'>
                  {[
                  { label: "Online Payment", color: "bg-purple-500" },
                  { label: "Cash on Delivery", color: "bg-orange-500" }
                  ].map((i, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <div className={`w-3 h-3 ${i.color} rounded-full`}></div>
                      <span className='text-xs text-gray-600'>
                          {i.label}
                        </span>
                    </div>
                  ))}
                </div>
              </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className='bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='border-b p-6 flex justify-between items-center'>
              <div>
              <h2 className='text-xl font-bold text-gray-800'>Order Details: {selectedOrder.orderId} </h2>
              <p className='text-gray-600 text-sm mt-1'>
                Ordered on{" "}
                {new Date(selectedOrder.placedAt).toLocaleDateString()}
              </p>
              </div>
            <button 
            onClick={() => setSelectedOrder(null)}
            className='cursor-pointer text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'>
              <X className='w-6 h-6'/>
            </button>
            </div>

            <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='border border-gray-200 rounded-xl p-5'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                  <User className='w-5 h-5 mr-2 text-[#43C6AC]'/>
                  Customer Information
                </h3>
                <div className='space-y-4'>
                  {[
                      { icon: User, label: "Customer", value: selectedOrder.shippingAddress.fullName },
                      { icon: Mail, label: "Email", value: selectedOrder.shippingAddress.email },
                      { icon: Phone, label: "Phone", value: selectedOrder.shippingAddress.phoneNumber },
                      { 
                        icon: MapPin, 
                        label: "Address", 
                        value: `${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.zipCode}` 
                      }
                  ].map((item, index) => (
                    <div key={index} className='flex items-start'>
                      <item.icon className='w-5 h-5 text-gray-500 mr-3 mt-1'/>
                      <div>
                        <p className='font-medium'>{item.label}</p>
                        <p className='text-gray-600 text-sm'>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border border-gray-200 rounded-xl p-5'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                  <BookOpen className='w-5 h-5 mr-2 text-[#43C6AC]'/>
                  Order Summary
                </h3>

                <div className='space-y-4'>
                  {selectedOrder.book.map((book, index) => (
                    <div key={index} className='flex items-center justify-between mb-4'>
                      <img 
                      src={`${API_BASE}${book.image}`}
                       alt={book.title} 
                       className='w-16 h-20 object-cover rounded'/>
                    <div className='flex-1 px-4'>
                    <p className='font-medium'>{book.title}</p>
                    <p className='text-sm text-gray-500'>Author: {book.author}</p>
                    <p className='text-xs text-gray-400'>ID: {book.book}</p>
                    </div>
                    <div className='text-right'>
                      <p>Qty: {book.quantity}</p>
                      <p className='text-sm'>₦{book.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })} each</p>
                    </div>
                    </div>
                  ))}

                  <div className='pt-4 space-y-2'>
                    {[
                      { label: "Subtotal:", value: `₦${selectedOrder.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}` },
                      { label: "Shipping:", value: `₦${selectedOrder.shippingCharge.toLocaleString("en-NG", { minimumFractionDigits: 2 })}` },
                      { label: "Tax (5%):", value: `₦${selectedOrder.taxAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}` },
                      { label: "Total:", value: `₦${selectedOrder.finalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, isTotal: true }
                    ].map((item, index) => (
                      <div key={index} className={`flex justify-between ${item.isTotal ? "pt-2 border-t" : ""}`}>
                        <span className='text-gray-600'>{item.label}</span>
                        <span className={`${item.isTotal ? "font-bold text-lg text-[#43C6AC]" : ""}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='border border-gray-200 rounded-xl p-5'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                    <CreditCard className='w-5 h-5 mr-2 text-[#43C6AC]'/>
                    Payment Information
                  </h3>
                  <div className='space-y-4'>
                    {[
                    { 
                      label: "Method:", 
                      value: selectedOrder.paymentMethod,
                      color: selectedOrder.paymentMethod === "Online Payment" ? 
                        "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"
                    },
                    { 
                      label: "Status:", 
                      value: selectedOrder.paymentStatus,
                      color: selectedOrder.paymentStatus === "Paid" ? 
                        "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    } 
                    ].map((item, index) => (
                      <div key={index} className='flex justify-between'>
                        <span className='text-gray-600'>{item.label}</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
              </div>

              <div className='border border-gray-200 rounded-xl p-5'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                  <Edit className='w-5 h-5 mr-2 text-[#43C6AC]'/>
                  Update Order Status
                </h3>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Order Status</label>
                  <select value={selectedOrder.orderStatus} onChange={(e) => {
                    const newStatus = e.target.value
                    setSelectedOrder({...selectedOrder, orderStatus: newStatus})
                    updateStatus(selectedOrder._id, newStatus)
                  }}
                  className='cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#41ad98] focus:border-transparent'>
                    {statusOptions.map(opt => (
                      <option value={opt.label} key={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='order-t p-6 flex justify-end'>
              <button 
              onClick={() => setSelectedOrder(null)} 
              className='cursor-pointer px-6 py-2 bg-gray-200 text-gray-800 rounded-lg mr-3 hover:bg-gray-300'>
                Close
              </button>

               <button 
              onClick={() => setSelectedOrder(null)} 
              className='cursor-pointer px-6 py-2 bg-[#43C6AC] text-white rounded-lg hover:bg-[#538a7f]'>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
