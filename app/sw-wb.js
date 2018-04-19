importScripts('/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.3.js');


//clientclain immediately takes control of the client as soon as it is activated
const workboxSW = new WorkboxSW({clientsClaim: true});

workboxSW.precache([
    {
        url: '/',
        revision: '1'
    },
    {
        url: '/static/js/material.min.js',
        revision: '1'
    },
    {
        url: '/static/js/main.js',
        revision: '1'
    },
    {
        url: '/static/css/material.min.css',
        revision: '1'
    },
    {
        url: '/static/css/style.css',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    }
]);

  workboxSW.router.registerRoute(
    '/static/images/(.*)',
    workboxSW.strategies.cacheFirst({
      cacheName: 'images',
      cacheExpiration: {
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
      cacheableResponse: {statuses: [0, 200]},
    })
  );

  workboxSW.router.registerRoute(
    'https://fonts.googleapis.com/icon\?(.*)',
    workboxSW.strategies.cacheFirst({
      cacheName: 'fonts',
      cacheExpiration: {
        maxEntries: 10,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
      cacheableResponse: {statuses: [0, 200]},
    })
  );

  workboxSW.router.registerRoute(
    '/post-page.html(.*)',
    workboxSW.strategies.staleWhileRevalidate()
  );

  workboxSW.router.registerRoute(
    '/static/data/(.*).json',
    workboxSW.strategies.networkFirst({
      cacheName: 'API',
      networkTimeoutSeconds: 2
    })
  );

  self.addEventListener('push', (e) => {
    let body;
    console.log(e.data);
    if (e.data) {
      body = e.data.text();
    }
    else {
      body = 'Hey There!!';
    }
    e.waitUntil(
      self.registration.showNotification(body)
    );
  });