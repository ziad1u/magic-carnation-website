import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  delay?: number;
  formatNumber?: boolean;
}

export default function StatsCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  showIcon = false,
  icon,
  delay = 0,
  formatNumber = true
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [delay, hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Enhanced easing function for more natural animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  const formatCount = (num: number) => {
    if (!formatNumber) return num.toString();
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <motion.span 
      ref={counterRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`font-bold ${className} inline-flex items-center gap-2`}
    >
      {showIcon && icon && (
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={isVisible ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-current"
        >
          {icon}
        </motion.div>
      )}
      
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative"
      >
        {prefix}
        <motion.span
          key={count}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {formatCount(count)}
        </motion.span>
        {suffix}
        
        {/* Animated underline effect */}
        {isVisible && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600"
          />
        )}
      </motion.span>
    </motion.span>
  );
}
