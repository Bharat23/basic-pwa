var CACHE_NAME = 'bharat-v1';

var CACHE_BLACKLIST = ['/my-sw.js','/sw.js'];

var CACHE_LIST = [
    '/',
    '/index.html',
    '/css/material.min.css',
    '/css/material.min.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('cache opened');
            return cache.addAll(CACHE_LIST);
        })
    );
});

/*self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});*/

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response)
                    return response;

                var fetchRequest = event.request.clone();
                return fetch(fetchRequest)
                    .then(function (response) {
                        if(!response || response.status !== 200 || response.type != 'basic')
                            return response;

                        var responseClone = response.clone();
                        console.log('fetch Request Runtime: ', fetchRequest);
                        if(CACHE_BLACKLIST.indexOf(fetchRequest) === -1){
                            console.log('not in black list  ');
                            caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    console.log('cache opened on run time')
                                    cache.put(fetchRequest, responseClone)
                                });
                        }
                        return response;
                    })
            })
            .catch(function () {
                return new Response(JSON.stringify({message: 'nothing to display'}));
            })
    );
});


self.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME];
    console.log('Activate Event Fired');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});