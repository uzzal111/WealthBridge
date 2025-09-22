"use client";

import React from "react";
import { 
  FaHome, 
  FaShoppingBag, 
  FaUsers, 
  FaGlobe,
  FaUser 
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MobileFooterNav() {
  const pathname = usePathname();

  const navItems = [
    { 
      icon: <FaHome size={18} />, 
      label: "Home", 
      path: "/",
      activeColor: "text-indigo-600",
      inactiveColor: "text-gray-500"
    },
    { 
      icon: <FaShoppingBag size={18} />, 
      label: "Orders", 
      path: "/rders",
      activeColor: "text-indigo-600",
      inactiveColor: "text-gray-500"
    },
    { 
      icon: <FaUsers size={18} />, 
      label: "Team", 
      path: "/eam",
      activeColor: "text-indigo-600",
      inactiveColor: "text-gray-500"
    },
    { 
      icon: <FaUser size={18} />, 
      label: "Me", 
      path: "/rofile",
      activeColor: "text-indigo-600",
      inactiveColor: "text-gray-500"
    },
    { 
      icon: <FaGlobe size={18} />, 
      label: "", 
      path: "/online",
      activeColor: "text-indigo-600",
      inactiveColor: "text-gray-500"
    },
    
  ];

  return (
    <>
      {/* Spacer div to prevent content from being hidden behind fixed footer */}
      <div className="h-20"></div>
      
      {/* Fixed footer with white background */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center px-4 py-3 max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <div className={`
                  p-2 rounded-lg mb-1
                  ${pathname === item.path ? item.activeColor : item.inactiveColor}
                  ${pathname === item.path ? "bg-indigo-50" : ""}
                  transition-colors duration-200
                `}>
                  {item.icon}
                </div>
                <span className={`
                  text-xs
                  ${pathname === item.path ? "text-indigo-600 font-medium" : "text-gray-500"}
                  transition-colors duration-200
                `}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}