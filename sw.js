const CACHE_NAME = 'app-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/offline.html'
];

// Instalación: cachear archivos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activación: limpieza de caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estrategia: Network First con fallback a cache y offline
self.addEventListener('fetch', event => {

  // Solo manejar solicitudes GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guardar copia en cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => {
          if (cached) return cached;

          // Para navegación permite fallback a index.html (SPA)
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          // Si no existe nada, mostrar offline
          return caches.match('/offline.html');
        })
      )
  );
});
