import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, X , ShoppingBag, User, Mail} from "lucide-react";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

const ActivityTab = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('admin-Token');
        const res = await axios.get(`${API_BASE}/api/admin/activity`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };
    fetchActivities();
  }, []);

  const sortedActivities = useMemo(() => {
    if (!sortConfig.key) return activities;
    return [...activities].sort((a, b) => {
      const aVal = sortConfig.key === "date" ? new Date(a.date) : a[sortConfig.key];
      const bVal = sortConfig.key === "date" ? new Date(b.date) : b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal > bVal ? -1 : 1);
    });
  }, [activities, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredActivities = sortedActivities.filter(a => 
    a.details?.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.details?.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoString) => new Date(isoString).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto pb-24'>
        <div className='flex flex-row justify-between items-start gap-6'>
          <div>
                <motion.h1
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-2xl font-bold text-gray-900 mb-1'
            >
              Activity Log
            </motion.h1>
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='text-gray-600 mb-6'
            >
              Monitor admin activities for books and orders
            </motion.p>
          </div>

          <Link
            to="/login"
            className="group relative flex items-center justify-center
                      w-10 h-10 rounded-full
                      bg-gray-100 hover:bg-gray-200
                      transition-all duration-200 ease-out
                      active:scale-95"
          >
            <User className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition" />
            <span className="absolute -bottom-9 opacity-0 group-hover:opacity-100
                            text-xs bg-gray-900 text-white px-2 py-1 rounded-md
                            transition pointer-events-none">
            Login
            </span>
          </Link>

        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6'
        >
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='w-4 h-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search by admin, email, or action...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-3 py-2.5 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#43C6AC]'
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='bg-white rounded-t-xl shadow-sm border border-gray-100 overflow-hidden'
        >
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  {['Admin ID', 'Admin', 'Email', 'Action', 'Date'].map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key.toLowerCase().replace(' ', ''))}
                      className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group'
                    >
                      <div className='flex items-center'>
                        {key}
                        <span className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          {sortConfig.key === key.toLowerCase().replace(' ', '') ? (
                            sortConfig.direction === 'asc' ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />
                          ) : (
                            <ChevronDown className='w-4 h-4 text-gray-400' />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right'>Details</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredActivities.map((a, idx) => (
                  <tr key={idx} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#43C6AC]'>ADM-{a.adminId}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{a.details.adminName}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{a.details.adminEmail}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{a.action}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{formatDate(a.createdAt)}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-right'>
                      <button
                        onClick={() => setSelectedActivity(a)}
                        className='cursor-pointer px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs hover:bg-indigo-200 transition-colors'
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filteredActivities.length && (
              <div className='text-center py-12'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
                  <BookOpen className='text-gray-400 w-8 h-8' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-1'>No activities found</h3>
                <p className='text-gray-500 text-sm'>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </motion.div>

        <div className='px-6 py-4 bg-gray-100 rounded-b-xl flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <div className='text-sm text-gray-600'>
            Showing <span className='font-medium'>{filteredActivities.length}</span> of{' '}
            <span className='font-medium'>{activities.length}</span> activities
          </div>
        </div>

      </div>

      {/* Activity Modal */}
     {selectedActivity && (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
      >

      <div className='flex justify-between items-center border-b px-6 py-4'>
        <div>
          <h2 className='text-xl font-semibold text-gray-800'>
            Activity Details
          </h2>
          <p className='text-xs text-gray-500'>
            ADM-{selectedActivity.adminId}
          </p>
        </div>

        <button
          onClick={() => setSelectedActivity(null)}
          className='cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition'
        >
          <X className='w-5 h-5' />
        </button>
      </div>

      <div className='p-6 space-y-6'>

        <div className='bg-gray-50 rounded-xl p-4 border'>
          <h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
            <User className='w-4 h-4 text-indigo-500' />
            Admin Info
          </h3>

          <div className='space-y-2 text-sm'>
            <p className='flex items-center gap-2'>
              <User className='w-4 h-4 text-gray-400' />
              {selectedActivity.details.adminName}
            </p>
            <p className='flex items-center gap-2 text-gray-600'>
              <Mail className='w-4 h-4 text-gray-400' />
              {selectedActivity.details.adminEmail}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700'>
            {selectedActivity.action}
          </span>

          <span className='text-sm text-gray-500'>
            {formatDate(selectedActivity.createdAt)}
          </span>
        </div>

        {selectedActivity.entityType === 'book' && (
          <div className='border rounded-xl p-4'>
            <h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
              <BookOpen className='w-4 h-4 text-emerald-500' />
              Book Details
            </h3>

            <div className='flex gap-5 items-start bg-gray-50 rounded-xl border border-gray-200 p-4'>

              <div className='flex-shrink-0'>
                {selectedActivity.details.image ? (
                  <img
                    src={selectedActivity.details.image}
                    alt={selectedActivity.details.title}
                    className='w-20 h-28 object-cover rounded-lg border shadow-sm'
                  />
                ) : (
                  <div className='w-20 h-28 flex items-center justify-center rounded-lg bg-gray-200 text-gray-400 text-xs border'>
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className='flex-1 space-y-3'>

                <div>
                  <p className='text-xs uppercase tracking-wide text-gray-400'>Title:</p>
                  <p className='font-semibold text-gray-900 leading-tight'>
                    {selectedActivity.details.title}
                  </p>
                </div>

                <div>
                  <p className='text-xs uppercase tracking-wide text-gray-400'>Author:</p>
                  <p className='text-gray-700'>
                    {selectedActivity.details.author}
                  </p>
                </div>

                <div className='flex flex-col items-start sm:flex-row items-center justify-between pt-2 border-t'>
                  <span className='text-xs uppercase tracking-wide text-gray-400'>
                    Price:
                  </span>

                  <span className='text-lg font-bold text-emerald-600'>
                    ₦{selectedActivity.details.price.toLocaleString("en-NG", {
                      minimumFractionDigits: 2
                    })}
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedActivity.entityType === 'order' && (
          <div className='border rounded-xl p-4'>
            <h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
              <ShoppingBag className='w-4 h-4 text-blue-500' />
              Order Details
            </h3>

            <div className='space-y-2 text-sm'>
              <p className='flex items-center gap-2'>
                <User className='w-4 h-4 text-gray-400' />
                {selectedActivity.details.user}
              </p>

              <p className='flex items-center gap-2 text-gray-600'>
                <Mail className='w-4 h-4 text-gray-400' />
                {selectedActivity.details.userEmail}
              </p>

              <p className='font-medium'>
                Order ID: {selectedActivity.details.orderId}
              </p>

              <p>
                Payment Status:
                <span className={`font-medium uppercase ml-2 px-2 py-1 rounded text-xs ${
                  selectedActivity.details.paymentStatus === 'Paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedActivity.details.paymentStatus}
                </span>
              </p>
              <p className='flex items-center gap-2'>
                Status:
                <span className='px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs'>
                  {selectedActivity.details.previousStatus}
                </span>
                →
                <span className='px-2 py-1 rounded bg-green-100 text-green-700 text-xs'>
                  {selectedActivity.details.newStatus}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className='border-t px-6 py-4 flex justify-end'>
        <button
          onClick={() => setSelectedActivity(null)}
          className='cursor-pointer px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition'
        >
          Close
        </button>
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default ActivityTab;
