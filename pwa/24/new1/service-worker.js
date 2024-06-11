self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/test/pwa/24/new1/index.html',
        '/test/pwa/24/new1/manifest.json',
        '/test/pwa/24/new1/styles.css', // if you have a CSS file
        '/test/pwa/24/new1/app.js' // if you have a JS file
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
