import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Edit3, Save, X, RotateCw, ZoomIn } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ImageManagerProps {
  imageId: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  editable?: boolean;
  category?: string;
  onImageChange?: (newSrc: string) => void;
  fallback?: string;
}

export default function ImageManager({
  imageId,
  defaultSrc,
  alt,
  className = "",
  editable = false,
  category = "general",
  onImageChange,
  fallback
}: ImageManagerProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // تحميل الصورة المحفوظة من localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem(`image_${imageId}`);
    if (savedImage) {
      setCurrentSrc(savedImage);
    }
  }, [imageId]);

  // حفظ الصورة في localStorage
  const saveImage = (src: string) => {
    localStorage.setItem(`image_${imageId}`, src);
    setCurrentSrc(src);
    onImageChange?.(src);
  };

  // معالجة رفع الملف
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const newSrc = e.target?.result as string;
      saveImage(newSrc);
      setIsUploading(false);
      setIsEditing(false);
    };
    
    reader.onerror = () => {
      alert('حدث خطأ في قراءة الملف');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  // معالجة تغيير الملف
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // فتح محدد الملفات
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // إعادة تعيين الصورة للافتراضية
  const resetImage = () => {
    saveImage(defaultSrc);
    setIsEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* الصورة الرئيسية */}
      <OptimizedImage
        src={currentSrc}
        alt={alt}
        className="w-full h-full"
        fallback={fallback}
        editable={editable}
        onImageChange={saveImage}
        onError={() => {
          if (fallback) {
            setCurrentSrc(fallback);
          }
        }}
      />

      {/* أزرار التحرير */}
      {editable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-500 transition-colors"
              title="تحرير الصورة"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="p-2 bg-green-500/80 text-white rounded-lg hover:bg-green-500 transition-colors"
              title="معاينة"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* محدد الملفات المخفي */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* نافذة التحرير */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">تحرير الصورة</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* معاينة الصورة الحالية */}
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={currentSrc}
                  alt={alt}
                  className="w-full h-full"
                />
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex space-x-3">
                <button
                  onClick={openFileDialog}
                  disabled={isUploading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'جاري الرفع...' : 'اختيار صورة جديدة'}</span>
                </button>
                <button
                  onClick={resetImage}
                  className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  إعادة تعيين
                </button>
              </div>

              {/* معلومات الصورة */}
              <div className="text-sm text-gray-400">
                <p><strong>الفئة:</strong> {category}</p>
                <p><strong>المعرف:</strong> {imageId}</p>
                <p><strong>الوصف:</strong> {alt}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة المعاينة */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">معاينة الصورة</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <OptimizedImage
                src={currentSrc}
                alt={alt}
                className="w-full h-auto rounded-lg max-h-[60vh] object-contain mx-auto"
                editable={true}
                onImageChange={saveImage}
              />
              <div className="mt-4 text-center">
                <p className="text-gray-400">{alt}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <button
                    onClick={openFileDialog}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    تغيير الصورة
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = currentSrc;
                      link.download = alt || 'image';
                      link.click();
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    تحميل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}