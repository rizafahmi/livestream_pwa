const CACHE_VERSION = 1;
const CACHE_NAME = "assets";
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/style.css',
    '/manifest.json',
    '/css/Nunito-Regular.ttf'
];

self.addEventListener("install", function(event) {
    event.waitUntil((async function () {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(assets);
    })());
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.info("[SW] Active!");
    event.waitUntil((async function() {
        if ("navitionPreload" in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    // event.respondWith(
    //     caches.match(event.request)
    //           .then(function(res) {
    //               return fetch(event.request) || res;
    //           })
    // );
    event.respondWith((async function() {
        const res = await caches.match(event.request);
        return fetch(event.request) || res;
    })());
});
