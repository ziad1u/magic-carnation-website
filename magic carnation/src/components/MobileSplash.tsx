import React from 'react';
import { motion } from 'framer-motion';

export default function MobileSplash() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white px-4 py-8 sm:hidden overflow-hidden">
      {/* دوائر متدرجة متحركة في الخلفية */}
      <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.circle cx="200" cy="400" r="160" stroke="white" strokeOpacity="0.08" strokeWidth="2"
          initial={{ scale: 0.95 }} animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="200" cy="400" r="110" stroke="white" strokeOpacity="0.07" strokeWidth="2"
          initial={{ scale: 1.1 }} animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.circle cx="200" cy="400" r="60" stroke="white" strokeOpacity="0.06" strokeWidth="2"
          initial={{ scale: 1 }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
      </motion.svg>
      {/* دائرة متدرجة مع موشن */}
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl mb-6"
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: [0.8, 1.05, 0.95, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          {/* شعار الشركة الجديد */}
          <motion.img
            src="/logo-magic.svg"
            alt="Magic Carnations Logo"
            className="w-16 h-16 rounded-full object-contain bg-white shadow-md"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          />
        </motion.div>
        {/* اسم الوكالة مع موشن */}
        <motion.h1
          className="text-3xl font-bold tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >Magic Carnation</motion.h1>
      </motion.div>
    </div>
  );
} 
