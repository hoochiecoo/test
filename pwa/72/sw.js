const CACHE_NAME = 'translator-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
    // Сюда можно добавить локальные иконки, если вы их скачали
];

// Установка: Кэшируем файлы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Активация: Чистим старый кэш
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});

// Перехват запросов: Сначала ищем в кэше (Cache First strategy)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        }).catch(() => {
            // Если нет ни кэша, ни интернета
            return caches.match('./index.html');
        })
    );
});
