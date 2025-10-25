import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File, imageType: string) => void;
  currentImages: { [key: string]: string };
}

export default function ImageUploader({ onImageUpload, currentImages }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'success' | 'error' | null }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageTypes = [
    { key: 'hero-image', label: 'صورة البطل الرئيسية', description: 'الصورة الرئيسية في أعلى الصفحة' },
    { key: 'portfolio-thumbnail', label: 'صور البورتfolio', description: 'صور الفيديوهات في قسم الأعمال' },
    { key: 'service-icon', label: 'أيقونات الخدمات', description: 'أيقونات قسم الخدمات' },
    { key: 'team-photo', label: 'صور الفريق', description: 'صور أعضاء الفريق' },
    { key: 'testimonial-avatar', label: 'صور العملاء', description: 'صور العملاء في قسم الشهادات' },
    { key: 'background-pattern', label: 'أنماط الخلفية', description: 'أنماط الخلفية المختلفة' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
        continue;
      }

      try {
        // محاكاة رفع الملف (يمكن استبدالها بـ API حقيقي)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // تحديد نوع الصورة بناءً على الاسم أو الحجم
        const imageType = determineImageType(file);
        
        onImageUpload(file, imageType);
        setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }));
        
      } catch (error) {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
      }
    }
    
    setUploading(false);
  };

  const determineImageType = (file: File): string => {
    const name = file.name.toLowerCase();
    
    if (name.includes('hero') || name.includes('main')) return 'hero-image';
    if (name.includes('portfolio') || name.includes('video')) return 'portfolio-thumbnail';
    if (name.includes('service') || name.includes('icon')) return 'service-icon';
    if (name.includes('team') || name.includes('member')) return 'team-photo';
    if (name.includes('testimonial') || name.includes('client')) return 'testimonial-avatar';
    if (name.includes('background') || name.includes('pattern')) return 'background-pattern';
    
    return 'hero-image'; // افتراضي
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">رفع وإدارة الصور</h3>
        <p className="text-gray-400">قم برفع الصور الجديدة لاستبدال الصور الحالية في الموقع</p>
      </div>

      {/* منطقة رفع الملفات */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-pink-500 bg-pink-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              اسحب الصور هنا أو انقر للاختيار
            </h4>
            <p className="text-gray-400 text-sm">
              يدعم JPG, PNG, SVG, WebP (حد أقصى 10MB لكل صورة)
            </p>
          </div>

          <button
            onClick={openFileDialog}
            disabled={uploading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'جاري الرفع...' : 'اختيار الصور'}
          </button>
        </div>
      </div>

      {/* حالة الرفع */}
      {Object.keys(uploadStatus).length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-lg font-semibold text-white">حالة الرفع:</h4>
          {Object.entries(uploadStatus).map(([fileName, status]) => (
            <div key={fileName} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300 flex-1">{fileName}</span>
              {status === 'success' && <Check className="w-5 h-5 text-green-400" />}
              {status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            </div>
          ))}
        </div>
      )}

      {/* الصور الحالية */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-white mb-4">الصور الحالية:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imageTypes.map((type) => (
            <div key={type.key} className="bg-gray-800/50 p-4 rounded-lg">
              <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                {currentImages[type.key] ? (
                  <img 
                    src={currentImages[type.key]} 
                    alt={type.label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <h5 className="text-sm font-semibold text-white mb-1">{type.label}</h5>
              <p className="text-xs text-gray-400">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* تعليمات الاستخدام */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h5 className="text-blue-300 font-semibold mb-2">💡 نصائح للرفع:</h5>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• استخدم أسماء ملفات وصفية لتحديد نوع الصورة تلقائياً</li>
          <li>• الصور المربعة مناسبة للأيقونات والصور الشخصية</li>
          <li>• الصور الأفقية مناسبة لصور البطل والخلفيات</li>
          <li>• استخدم تنسيق WebP للحصول على أفضل ضغط</li>
        </ul>
      </div>
    </div>
  );
}
