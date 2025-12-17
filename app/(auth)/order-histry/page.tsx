'use client';

import { useState } from 'react';

interface Order {
  id: string;
  packageName: string;
  productName: string;
  productImage: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  createdAt: Date;
}

export default function OrderHistoryPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      packageName: 'Starter',
      productName: 'iPhone 15 Pro',
      productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
      amount: 30,
      status: 'Completed',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'ORD-1002',
      packageName: 'Silver',
      productName: 'MacBook Pro M3',
      productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      amount: 750,
      status: 'Pending',
      createdAt: new Date('2024-01-18')
    },
    {
      id: 'ORD-1003',
      packageName: 'Gold',
      productName: 'Samsung Galaxy S23',
      productImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
      amount: 1200,
      status: 'Completed',
      createdAt: new Date('2024-01-20')
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    if (status === 'Completed') return 'bg-green-500';
    if (status === 'Pending') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📦 Order History</h1>
          <p className="text-blue-300 text-sm">
            All your package purchases and product review orders
          </p>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-blue-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr
                  key={order.id}
                  className="border-b border-slate-700 hover:bg-slate-700 transition"
                >
                  <td className="px-6 py-4 text-white font-semibold">
                    {order.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-600"
                      />
                      <span className="text-white">{order.productName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-blue-200">
                    {order.packageName}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-bold">
                    ${order.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No orders found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <span className="text-slate-400 text-sm">
            WealthBridge • Secure & Transparent Order History
          </span>
        </div>
      </div>
    </div>
  );
}
