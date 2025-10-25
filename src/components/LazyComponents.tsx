import React, { Suspense, lazy } from 'react';

// Lazy loading للمكونات الثقيلة
export const LazyJobApplicationPage = lazy(() => import('./JobApplicationPage'));
export const LazyLiveModeratorPage = lazy(() => import('./LiveModeratorPage'));
export const LazyJoinAgencyPage = lazy(() => import('./JoinAgencyPage'));
export const LazyAdminDashboard = lazy(() => import('./AdminDashboard'));

// Loading component
export const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
        <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <p className="text-gray-400">جاري التحميل...</p>
    </div>
  </div>
);

// HOC للتحميل المؤجل
export const withLazyLoading = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
};
