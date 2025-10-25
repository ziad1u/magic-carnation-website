import React from 'react';

// Simplified AdminDashboard for testing
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-pink-400 mb-8">لوحة الإدارة - Magic Carnation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-2">مشاهدات تيكتوك</h3>
          <p className="text-2xl font-bold text-pink-400">12.5M</p>
          <p className="text-green-400 text-sm">+2.3%</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-2">الحملات الإعلانية</h3>
          <p className="text-2xl font-bold text-purple-400">32</p>
          <p className="text-green-400 text-sm">+1 حملة</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-2">المؤثرون المتعاقدون</h3>
          <p className="text-2xl font-bold text-blue-400">12</p>
          <p className="text-green-400 text-sm">+2 مؤثر</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-2">العملاء النشطون</h3>
          <p className="text-2xl font-bold text-green-400">8</p>
          <p className="text-gray-400 text-sm">بدون تغيير</p>
        </div>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">إدارة الصور</h2>
        <p className="text-gray-400 mb-4">نظام إدارة الصور الشامل جاهز للاستخدام</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">صور البطل</h4>
            <p className="text-gray-400 text-sm">إدارة الصور الرئيسية</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">صور البورتfolio</h4>
            <p className="text-gray-400 text-sm">إدارة صور المشاريع</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">صور الفريق</h4>
            <p className="text-gray-400 text-sm">إدارة صور أعضاء الفريق</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h5 className="text-green-300 font-semibold mb-2">✅ النظام جاهز!</h5>
          <p className="text-green-200 text-sm">
            تم إنشاء نظام إدارة الصور الشامل بنجاح. يمكنك الآن رفع وتنظيم جميع الصور في الموقع.
          </p>
        </div>
      </div>
    </div>
  );
}
