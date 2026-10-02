// Bump this version whenever index.html changes, so installed copies pick up the update.
const CACHE_NAME = 'ditem1-cache-v3';

const ASSETS_TO_CACHE = [
  '/DITE-M1/',
  '/DITE-M1/index.html',
  '/DITE-M1/manifest.json'
];

// Third-party files the page needs to look right (Tailwind + Inter font).
// They are cached too, otherwise the app loads unstyled when offline.
const RUNTIME_HOSTS = ['cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const PRECACHE_CROSS_ORIGIN = ['https://cdn.tailwindcss.com'];

// Install Event: Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE).then(() =>
        // Best effort: a CDN failure must not block installation
        Promise.all(PRECACHE_CROSS_ORIGIN.map((url) =>
          fetch(url, { mode: 'no-cors' })
            .then((response) => cache.put(url, response))
            .catch(() => {})
        ))
      ))
      .then(() => self.skipWaiting())
  );
});

// Activate Event: remove caches from older versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // App files: network first so fixes reach users, cached copy when offline
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request, { ignoreSearch: true })
          .then((cached) => cached || caches.match('/DITE-M1/index.html')))
    );
    return;
  }

  // Tailwind / fonts: serve the cached copy immediately, refresh it in the background
  if (RUNTIME_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((response) => {
              if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
