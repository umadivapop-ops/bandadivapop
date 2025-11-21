
const CACHE = "divapop-v1";
const ASSETS = [
  "/index.html","/sobre.html","/galeria.html","/videos.html","/contato.html",
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.concat([
    '/assets/css/style.min.css','/assets/js/main.min.js','/assets/manifest.json','/assets/icons/android-chrome-192x192.png'
  ]))));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(fetch(evt.request).catch(()=>caches.match('/offline.html')));
    return;
  }
  evt.respondWith(caches.match(evt.request).then(cached=>cached || fetch(evt.request)));
});
