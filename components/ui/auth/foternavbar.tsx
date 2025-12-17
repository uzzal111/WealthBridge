"use client";

import React from "react";
import { 
  FaHome, 
  FaShoppingBag, 
  FaUsers, 
  FaGlobe,
  FaUser,
  FaFire,
  FaCrown,
  FaRocket,
  FaGem,
  FaTrophy,
  FaChartLine
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MobileFooterNav() {
  const pathname = usePathname();

  const navItems = [
    { 
      icon: <FaHome size={20} />, 
      activeIcon: <FaHome size={22} />,
      label: "Home", 
      path: "/dashboard",
      activeColor: "text-amber-400",
      inactiveColor: "text-slate-400",
      bgActive: "bg-gradient-to-br from-amber-900/30 to-orange-900/20",
      bgInactive: "bg-slate-800/20",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
      borderColor: "border-amber-500/40"
    },
    { 
      icon: <FaShoppingBag size={20} />, 
      activeIcon: <FaGem size={22} />,
      label: "Orders", 
      path: "/order",
      activeColor: "text-emerald-400",
      inactiveColor: "text-slate-400",
      bgActive: "bg-gradient-to-br from-emerald-900/30 to-green-900/20",
      bgInactive: "bg-slate-800/20",
      glow: "shadow-[0_0_15px_rgba(52,211,153,0.4)]",
      borderColor: "border-emerald-500/40"
    },
    { 
      icon: <FaUsers size={20} />, 
      activeIcon: <FaRocket size={22} />,
      label: "Team", 
      path: "/team",
      activeColor: "text-purple-400",
      inactiveColor: "text-slate-400",
      bgActive: "bg-gradient-to-br from-purple-900/30 to-pink-900/20",
      bgInactive: "bg-slate-800/20",
      glow: "shadow-[0_0_15px_rgba(192,132,252,0.4)]",
      borderColor: "border-purple-500/40"
    },
    { 
      icon: <FaUser size={20} />, 
      activeIcon: <FaCrown size={22} />,
      label: "Profile", 
      path: "/profile",
      activeColor: "text-blue-400",
      inactiveColor: "text-slate-400",
      bgActive: "bg-gradient-to-br from-blue-900/30 to-cyan-900/20",
      bgInactive: "bg-slate-800/20",
      glow: "shadow-[0_0_15px_rgba(96,165,250,0.4)]",
      borderColor: "border-blue-500/40"
    },
    { 
       
      activeIcon: <FaFire size={24} />,
      label: "Live", 
      path: "",
      activeColor: "text-rose-400",
      inactiveColor: "text-slate-400",
      bgActive: "bg-gradient-to-br from-rose-900/30 to-red-900/20",
      bgInactive: "bg-slate-800/20",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]",
      borderColor: "border-rose-500/40",
      pulse: true
    }
  ];

  return (
    <>
      {/* Spacer div to prevent content from being hidden behind fixed footer */}
      <div className="h-24"></div>
      
      {/* Fixed footer with dark theme - Full width */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-gray-900 to-slate-900 border-t border-slate-700/50 z-50 shadow-2xl">
        <div className="flex justify-around items-center px-2 py-4 mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex flex-col items-center flex-1 relative group"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center relative"
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                    />
                  )}
                  
                  {/* Icon container with unique effects */}
                  <div className={`
                    relative p-3 rounded-2xl mb-2 transition-all duration-300
                    ${isActive ? item.bgActive + ' ' + item.glow + ' border ' + item.borderColor : item.bgInactive}
                    group-hover:scale-110 group-hover:brightness-110
                  `}>
                    {/* Main icon with animation */}
                    <motion.div
                      animate={isActive ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                      className={`
                        transition-all duration-300
                        ${isActive ? item.activeColor : item.inactiveColor}
                      `}
                    >
                      {isActive ? item.activeIcon : item.icon}
                    </motion.div>
                    
                    {/* Pulsing effect for Live button */}
                    {item.pulse && isActive && (
                      <motion.div 
                        className="absolute inset-0 rounded-2xl border-2 border-rose-500/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    {/* Floating particles for active state */}
                    {isActive && (
                      <>
                        <motion.div 
                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current opacity-70"
                          animate={{
                            y: [0, -5, 0],
                            x: [0, 3, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div 
                          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-current opacity-70"
                          animate={{
                            y: [0, 3, 0],
                            x: [0, -3, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2
                          }}
                        />
                      </>
                    )}
                  </div>
                  
                  {/* Label with animated underline for active state */}
                  <div className="relative">
                    <span className={`
                      text-xs font-semibold transition-all duration-300
                      ${isActive ? item.activeColor + ' font-bold' : 'text-slate-400'}
                    `}>
                      {item.label}
                    </span>
                    
                    {/* Animated underline for active item */}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  
                  {/* Badge for Live item */}
                  {item.label === "Live" && (
                    <div className={`
                      absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                      ${isActive 
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white animate-pulse' 
                        : 'bg-slate-700 text-slate-300'
                      }
                    `}>
                      LIVE
                    </div>
                  )}
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className={`
                      px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap
                      ${isActive 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-slate-600' 
                        : 'bg-slate-800 text-slate-300'
                      }
                    `}>
                      {item.label}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-inherit"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Connection line between items */}
                {item.path !== "/online" && (
                  <div className="absolute top-4 right-0 w-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50 group-hover:via-slate-400 transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      </footer>
    </>
  );
}