const CACHE_NAME = 'ditem1-cache-v1';
const ASSETS_TO_CACHE = [
  '/DITE-M1/',
  '/DITE-M1/index.html'
  // Note: Add your .css or .js file paths here if they are in separate files
];

// Install Event: Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch Event: Serve from cache when offline (Security/PWA feature)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
