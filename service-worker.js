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
    if(event.request.mode === 'navigate') {
        event.respondWith((async function() {
            try {
                const preloadResponse = await event.preloadResponse;
                if(preloadResponse) {
                    return preloadResponse;
                }
                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.error("Fetch failed, returning offline page.");
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request);
                return cachedResponse || fetch(event.request);
            }
        })());
    }
});
