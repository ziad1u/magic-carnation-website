import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialsCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-center"
        >
          {/* Enhanced Main Testimonial Card */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700/50 hover:border-pink-500/30 transition-all duration-500 relative overflow-hidden shadow-2xl mb-6">
            
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 animate-pulse"></div>
            
            {/* Background Quote Icon */}
            <div className="absolute top-8 right-8 opacity-5">
              <svg className="w-32 h-32 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Enhanced Rating */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-gray-700/50 shadow-lg">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Enhanced Quote */}
              <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-200 text-center mb-8 leading-relaxed font-medium relative">
                <span className="text-pink-400 text-3xl md:text-4xl font-bold leading-none absolute -top-2 -right-2">"</span>
                <span className="relative px-6">
                  {testimonials[currentIndex].content}
                </span>
                <span className="text-pink-400 text-3xl md:text-4xl font-bold leading-none absolute -bottom-2 -left-2">"</span>
              </blockquote>

              {/* Enhanced Author Info */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-white mb-1">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-base text-pink-400 font-medium">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Navigation Dots */}
      <div className="flex justify-center items-center space-x-3 mb-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`relative transition-all duration-500 transform ${
              index === currentIndex
                ? 'scale-125'
                : 'hover:scale-110'
            }`}
          >
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/50'
                : 'bg-gray-600 hover:bg-gray-500'
            }`} />
            {index === currentIndex && (
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Arrow Navigation */}
      <button
        onClick={prevTestimonial}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-pink-500/20 hover:to-purple-600/20 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 shadow-2xl group"
      >
        <svg className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-pink-500/20 hover:to-purple-600/20 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 shadow-2xl group"
      >
        <svg className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
