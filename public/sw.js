// Service Worker for caching and performance optimization
const CACHE_NAME = 'magic-carnation-v1';
const STATIC_CACHE_NAME = 'magic-carnation-static-v1';
const DYNAMIC_CACHE_NAME = 'magic-carnation-dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo-magic.svg',
  '/hero-image.jpg',
  '/Character-working-desk-with-laptop 1.png',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Determine cache strategy based on request type
            const cacheName = isStaticAsset(request.url) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;

            caches.open(cacheName)
              .then((cache) => {
                cache.put(request, responseToCache);
                console.log('Cached response for:', request.url);
              });

            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            throw error;
          });
      })
  );
});

// Helper function to determine if asset is static
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'];
  const staticPaths = ['/static/', '/assets/', '/images/', '/css/', '/js/'];
  
  return staticExtensions.some(ext => url.includes(ext)) ||
         staticPaths.some(path => url.includes(path)) ||
         url.includes('logo-magic') ||
         url.includes('hero-image');
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();
    
    for (const submission of pendingSubmissions) {
      try {
        await fetch(submission.url, {
          method: 'POST',
          body: submission.data,
          headers: submission.headers
        });
        
        // Remove from pending list after successful submission
        await removePendingSubmission(submission.id);
        console.log('Background sync successful for:', submission.id);
      } catch (error) {
        console.error('Background sync failed for:', submission.id, error);
      }
    }
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

// Placeholder functions for IndexedDB operations
async function getPendingSubmissions() {
  // Implementation would use IndexedDB to get pending form submissions
  return [];
}

async function removePendingSubmission(id) {
  // Implementation would remove submission from IndexedDB
  console.log('Removing pending submission:', id);
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/logo-magic.svg',
    badge: '/logo-magic.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/logo-magic.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/logo-magic.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Magic Carnation', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
