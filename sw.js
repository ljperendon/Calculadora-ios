
const CACHE_NAME = "calc-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// Instalar
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activar
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// Interceptar peticiones
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
