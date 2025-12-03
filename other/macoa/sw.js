const CACHE_NAME = 'tennis-coach-v3';
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
    'https://cdn.jsdelivr.net/npm/quasar@2.14.0/dist/quasar.umd.prod.js',
    'https://cdn.jsdelivr.net/npm/quasar@2.14.0/dist/quasar.prod.css',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(response => {
                // Кэшируем новые запросы (например, иконки)
                if (response.status === 200) {
                     const clone = response.clone();
                     caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        })
    );
});
