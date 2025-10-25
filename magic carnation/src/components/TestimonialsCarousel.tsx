import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 transition-all duration-300 ${
          index < rating 
            ? 'text-yellow-400 fill-current drop-shadow-lg transform hover:scale-110' 
            : 'text-gray-600 hover:text-gray-500'
        }`}
      />
    ));
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Enhanced Main Testimonial Card */}
      <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-gray-700/50 hover:border-pink-500/30 transition-all duration-500 relative overflow-hidden shadow-2xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 animate-pulse"></div>
        
        {/* Background Quote Icon */}
        <div className="absolute top-12 right-12 opacity-5">
          <Quote className="w-32 h-32 text-pink-500" />
        </div>

        {/* Testimonial Content */}
        <div className="relative z-10">
          {/* Enhanced Rating */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50">
              {renderStars(testimonials[currentIndex]?.rating || 5)}
            </div>
          </div>

          {/* Enhanced Quote */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-gray-200 text-center mb-12 leading-relaxed font-medium">
            <span className="text-pink-400 text-4xl md:text-5xl font-bold leading-none">"</span>
            <span className="relative">
              {testimonials[currentIndex]?.content}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20"></div>
            </span>
            <span className="text-pink-400 text-4xl md:text-5xl font-bold leading-none">"</span>
          </blockquote>

          {/* Enhanced Author Info */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center shadow-xl ring-4 ring-pink-500/20">
                <span className="text-white font-bold text-2xl">
                  {testimonials[currentIndex]?.name?.charAt(0) || '?'}
                </span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">
              {testimonials[currentIndex]?.name}
            </h4>
            <p className="text-pink-400 font-semibold text-lg bg-gray-800/30 px-4 py-2 rounded-full border border-pink-500/20">
              {testimonials[currentIndex]?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="flex items-center justify-center mt-12 space-x-6">
        <button
          onClick={goToPrevious}
          className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:scale-110"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Enhanced Dots Indicator */}
        <div className="flex space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-125 shadow-lg'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:scale-110"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Enhanced Auto-play Toggle */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
            isAutoPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></div>
            <span>{isAutoPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
