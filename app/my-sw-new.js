const CACHE_NAME = 'cache_v1';

const PRECACHE_LIST = [
    '/static/js/material.min.js',
    '/static/css/material.min.css',
    '/index.html',
    '/',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(PRECACHE_LIST);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) {
                return response;
            }

            let requestClone = e.request.clone();
            return fetch(requestClone)
            .then((res) => {
                if (!res || res.status !== 200 || res.type !== 'basic') {
                    return res;
                }
            })

        })
    );
});