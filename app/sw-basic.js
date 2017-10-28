var CACHE_NAME = 'bharat-v1';

var CACHE_BLACKLIST = ['/my-sw.js','/sw.js'];

var CACHE_LIST = [
    '/',
    '/index.html',
    '/css/material.min.css',
    '/css/material.min.js',
    '/js/main.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('cache opened');
            return cache.addAll(CACHE_LIST);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});