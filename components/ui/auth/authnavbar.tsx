'use client';

import { useState } from 'react';
import { 
  FiTrendingUp, FiBell, FiLogOut, FiMenu,
  FiHome, FiUsers, FiGlobe, FiGift, FiCreditCard, FiDollarSign, FiDownload, 
  FiList, FiClock, FiAward, FiShoppingCart, FiShoppingBag, FiTag, FiTruck, FiUser
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      title: "My Wallet",
      items: [
        { name: "Deposit", icon: <FiDownload />, path: "/wallet/deposit" },
        { name: "Buy / Sell", icon: <FiDollarSign />, path: "/wallet/buy-sell" },
        { name: "Withdraw", icon: <FiCreditCard />, path: "/wallet/withdraw" },
        { name: "Order History", icon: <FiList />, path: "/wallet/orders" },
        { name: "Transaction History", icon: <FiClock />, path: "/wallet/transactions" },
        { name: "My Reward Point", icon: <FiAward />, path: "/wallet/rewards" }
      ]
    },
    {
      title: "E-Commerce",
      items: [
        { name: "Products", icon: <FiShoppingBag />, path: "/products" },
        { name: "Orders", icon: <FiShoppingCart />, path: "/orders" },
        { name: "Discounts", icon: <FiTag />, path: "/discounts" },
        { name: "Shipping", icon: <FiTruck />, path: "/shipping" }
      ]
    },
    {
      title: "Account",
      items: [
        { name: "Home", icon: <FiHome />, path: "/" },
        { name: "Team", icon: <FiUsers />, path: "/team" },
        { name: "Online", icon: <FiGlobe />, path: "/online" },
        { name: "Benefit Program", icon: <FiGift />, path: "/benefits" },
        { name: "Profile", icon: <FiUser />, path: "/profile" }
      ]
    }
  ];

  return (
    <div className="">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="p-4 flex-1 overflow-y-auto">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {section.title && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        pathname === item.path
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar Top */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3 flex justify-between items-center">
            
            {/* Left: Sidebar toggle + Logo */}
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden"
              >
                <FiMenu className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold text-gray-800">WealthBridge</span>
              </div>
            </div>

            {/* Right: Notification + Logout */}
            <div className="flex items-center space-x-6 text-gray-600">
              <button className="relative cursor-pointer hover:text-blue-600">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  3
                </span>
              </button>

              <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 font-medium">
                <FiLogOut /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50" 
              onClick={toggleSidebar} 
            />
            <aside className="absolute left-0 top-0 w-64 h-full bg-white shadow-xl p-4 overflow-y-auto">
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  {section.title && (
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                      {section.title}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.path}
                          onClick={toggleSidebar}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            pathname === item.path
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
