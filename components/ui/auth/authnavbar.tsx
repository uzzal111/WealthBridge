'use client';

import { useState, useEffect } from 'react';
import { 
  FiTrendingUp, FiBell, FiLogOut, FiMenu, FiX,
  FiHome, FiUsers, FiGlobe, FiGift, FiCreditCard, FiDollarSign, FiDownload, 
  FiList, FiClock, FiAward, FiShoppingCart, FiShoppingBag, FiTag, FiTruck, FiUser,
  FiChevronLeft
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // রুট চেঞ্জ হলে সাইডবার বন্ধ করার জন্য
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      title: "My Wallet",
      items: [
        { name: "Deposit", icon: <FiDownload />, path: "/deposit" },
        { name: "Withdraw", icon: <FiCreditCard />, path: "/withdraw" },
        { name: "Order History", icon: <FiList />, path: "/order" },
        { name: "Transaction History", icon: <FiClock />, path: "/transactions" },
        { name: "My Reward Point", icon: <FiAward />, path: "/rewards" }
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
    <>
      {/* Fixed Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 shadow-lg border-b border-slate-700/50 backdrop-blur-md bg-opacity-95">
        <div className="px-4 py-3 flex justify-between items-center">
          
          {/* Left: Menu Button + Logo - ALL DEVICES */}
          <div className="flex items-center space-x-3">
            {/* Menu button for ALL devices */}
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              {isSidebarOpen ? (
                <FiX className="w-5 h-5 text-slate-300" />
              ) : (
                <FiMenu className="w-5 h-5 text-slate-300" />
              )}
            </button>
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                WealthBridge
              </span>
            </div>
          </div>

          {/* Right: Notification + Logout */}
          <div className="flex items-center space-x-6">
            <button className="relative cursor-pointer text-slate-300 hover:text-blue-400 transition-colors">
              <FiBell size={20} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 font-medium transition-colors">
              <FiLogOut className="w-4 h-4" /> 
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer - ALL DEVICES (Mobile & Desktop) */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleSidebar}
        />
        
        {/* Sidebar Panel */}
        <aside className={`absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 to-gray-900 shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">WealthBridge</h2>
                <p className="text-xs text-slate-400">Navigation Menu</p>
              </div>
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-slate-800 text-slate-300"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="h-[calc(100vh-120px)] overflow-y-auto p-4">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                {section.title && (
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all ${
                          pathname === item.path
                            ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/30 text-white border-l-4 border-blue-500'
                            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-l-4 hover:border-slate-600'
                        }`}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* User Info Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/90">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">AJ</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">Alex Johnson</p>
                <p className="text-xs text-slate-400">Gold Elite Member</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-green-400">$8,450.75</p>
                <p className="text-xs text-slate-500">Balance</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[56px]"></div>
    </>
  );
}