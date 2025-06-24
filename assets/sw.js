const CACHE_NAME = "mi-portafolio-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./sobre.html",
  "./portafolio.html",
  "./servicios.html",
  "./blog.html",
  "./contacto.html",
  "./assets/style.css",
  "./assets/script.js",
  "./assets/favicon.ico",
  "./assets/favicon.svg",
  "./assets/apple-touch-icon.png"
];

// Instalación y caché inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activación: limpiar caché vieja
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch: responder con caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
