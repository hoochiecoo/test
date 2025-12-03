const CACHE_NAME = 'trainer-app-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
    'https://cdn.jsdelivr.net/npm/quasar@2.14.0/dist/quasar.umd.prod.js',
    'https://cdn.jsdelivr.net/npm/quasar@2.14.0/dist/quasar.prod.css',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
];

// Установка SW и предварительное кэширование
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Активация и удаление старых кэшей
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Перехват запросов (Стратегия: Cache First, then Network & Cache)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Если есть в кэше — возвращаем кэш
            if (cachedResponse) {
                return cachedResponse;
            }

            // Если нет — качаем из сети
            return fetch(event.request).then(networkResponse => {
                // Проверяем валидность ответа
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                    return networkResponse;
                }

                // Кэшируем новый ресурс (например, файлы шрифтов woff2, которые подгружаются динамически)
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});
