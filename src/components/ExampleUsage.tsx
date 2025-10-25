import React from 'react';
import { HeroImage, LogoImage, PortfolioImage, TeamImage, TestimonialImage } from './components/SiteImages';

// مثال على استخدام نظام إدارة الصور في الموقع الرئيسي
export default function ExampleUsage() {
  return (
    <div className="space-y-8">
      {/* مثال على صورة البطل */}
      <section className="relative min-h-screen flex items-center justify-center">
        <HeroImage 
          className="absolute inset-0 opacity-25 w-full h-full object-cover"
          editable={true}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white">عنوان الصفحة</h1>
        </div>
      </section>

      {/* مثال على الشعار */}
      <header className="flex items-center space-x-4">
        <LogoImage 
          className="w-12 h-12"
          editable={true}
        />
        <span className="text-xl font-bold">اسم الشركة</span>
      </header>

      {/* مثال على صور البورتfolio */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortfolioImage 
          className="aspect-square rounded-lg"
          editable={true}
          imageId="portfolio-1"
          defaultSrc="/portfolio-1.jpg"
          alt="مشروع رقم 1"
        />
        <PortfolioImage 
          className="aspect-square rounded-lg"
          editable={true}
          imageId="portfolio-2"
          defaultSrc="/portfolio-2.jpg"
          alt="مشروع رقم 2"
        />
        <PortfolioImage 
          className="aspect-square rounded-lg"
          editable={true}
          imageId="portfolio-3"
          defaultSrc="/portfolio-3.jpg"
          alt="مشروع رقم 3"
        />
      </section>

      {/* مثال على صور الفريق */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TeamImage 
          className="aspect-square rounded-full"
          editable={true}
          imageId="team-member-1"
          defaultSrc="/team-1.jpg"
          alt="عضو الفريق الأول"
        />
        <TeamImage 
          className="aspect-square rounded-full"
          editable={true}
          imageId="team-member-2"
          defaultSrc="/team-2.jpg"
          alt="عضو الفريق الثاني"
        />
        <TeamImage 
          className="aspect-square rounded-full"
          editable={true}
          imageId="team-member-3"
          defaultSrc="/team-3.jpg"
          alt="عضو الفريق الثالث"
        />
        <TeamImage 
          className="aspect-square rounded-full"
          editable={true}
          imageId="team-member-4"
          defaultSrc="/team-4.jpg"
          alt="عضو الفريق الرابع"
        />
      </section>

      {/* مثال على صور الشهادات */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <TestimonialImage 
            className="w-16 h-16 rounded-full mx-auto mb-4"
            editable={true}
            imageId="testimonial-1"
            defaultSrc="/client-1.jpg"
            alt="عملائنا"
          />
          <p className="text-white text-center">"خدمة ممتازة!"</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <TestimonialImage 
            className="w-16 h-16 rounded-full mx-auto mb-4"
            editable={true}
            imageId="testimonial-2"
            defaultSrc="/client-2.jpg"
            alt="Satisfied Client"
          />
          <p className="text-white text-center">"نتائج مذهلة!"</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <TestimonialImage 
            className="w-16 h-16 rounded-full mx-auto mb-4"
            editable={true}
            imageId="testimonial-3"
            defaultSrc="/client-3.jpg"
            alt="عميل مميز"
          />
          <p className="text-white text-center">"أفضل وكالة!"</p>
        </div>
      </section>
    </div>
  );
}
