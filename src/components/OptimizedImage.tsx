import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  priority?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  format = 'webp',
  priority = false,
  style,
  onLoad,
  onError
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isWebPSupported, setIsWebPSupported] = useState(false);

  useEffect(() => {
    // Check WebP support
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setIsWebPSupported(checkWebPSupport());
  }, []);

  useEffect(() => {
    // Generate optimized image URL
    const generateOptimizedUrl = () => {
      try {
        const url = new URL(src, window.location.origin);
        
        // Add optimization parameters
        if (width) url.searchParams.set('w', width.toString());
        if (height) url.searchParams.set('h', height.toString());
        url.searchParams.set('q', quality.toString());
        
        // Use WebP if supported, otherwise fallback to original format
        if (isWebPSupported && format === 'webp') {
          url.searchParams.set('f', 'webp');
        }
        
        return url.toString();
      } catch (error) {
        console.warn('Error generating optimized URL:', error);
        return src;
      }
    };

    setOptimizedSrc(generateOptimizedUrl());
  }, [src, width, height, quality, format, isWebPSupported]);

  // Generate responsive image sources
  const generateSrcSet = () => {
    if (!width) return undefined;
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    const srcSet = breakpoints
      .filter(bp => bp <= width * 2) // Don't exceed 2x the original width
      .map(bp => {
        const url = new URL(src, window.location.origin);
        url.searchParams.set('w', bp.toString());
        url.searchParams.set('q', quality.toString());
        if (isWebPSupported && format === 'webp') {
          url.searchParams.set('f', 'webp');
        }
        return `${url.toString()} ${bp}w`;
      })
      .join(', ');
    
    return srcSet;
  };

  return (
    <LazyImage
      src={optimizedSrc}
      alt={alt}
      className={className}
      style={style}
      onLoad={onLoad}
      onError={onError}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default OptimizedImage;