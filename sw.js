// Service Worker — 身心曆 PWA
// 版本：1.0.0（每次更新內容時，修改這個版本號）
const CACHE_NAME = 'ashley-pwa-v1';

// 要快取的檔案清單（離線也能開啟）
const CACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 安裝：快取所有檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
});

// 啟動：清除舊版快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// 請求攔截：優先使用快取，快取沒有再去網路拿
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});
