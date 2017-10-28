importScripts('/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.0.js');


//clientclain immediately takes control of the client as soon as it is activated
const workboxSW = new WorkboxSW({clientsClaim: true});

workboxSW.precache([
    {
        url: '/',
        revision: '1'
    },
    {
        url: '/js/material.min.js',
        revision: '1'
    },
    {
        url: '/js/main.js',
        revision: '1'
    },
    {
        url: '/css/material.min.css',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    }
]);

  workboxSW.router.registerRoute(
    '/images/(.*)',
    workboxSW.strategies.cacheFirst({
      cacheName: 'images',
      cacheExpiration: {
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
      cacheableResponse: {statuses: [0, 200]},
    })
  );

console.log('ge',workboxSW.strategies);

  workboxSW.router.registerRoute(
    '/post-page.html(.*)',
    workboxSW.strategies.staleWhileRevalidate()
  );

  workboxSW.router.registerRoute(
    '/data/(.*).json',
    workboxSW.strategies.networkFirst({
      cacheName: 'API',
      networkTimeoutSeconds: 2
    })
  );