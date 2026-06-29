const CACHE_NAME = "calc-auto-v1";

// archivos a cachear
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js"
];

// instalar
self.addEventListener("install", (event) => {
  self.skipWaiting(); // ✅ fuerza actualización inmediata

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// activar
self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // ✅ borra versiones antiguas
          }
        })
      );
    })
  );

  self.clients.claim(); // ✅ fuerza control inmediato
});

// interceptar requests
self.addEventListener("fetch", (event) => {

  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response; // ✅ siempre usa versión ONLINE
      })
      .catch(() => {
        return caches.match(event.request); // fallback offline
      })
  );
});
