// Service worker: keeps the site usable on a flaky connection.
// - Pages: network first. The home page is cached on each visit, so it still opens offline;
//   any other page that can't load shows /offline.html.
// - Built files (/assets/, hashed): cache first, they never change.
// - Fonts, images, icons and card covers: served from cache, refreshed in the background.
// Bump VERSION to drop everything cached by an older version.
const VERSION = 'v1';
const CACHE = `vd-${VERSION}`;
const OFFLINE = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const res = await fetch(OFFLINE, { cache: 'reload' });
      await cache.put(OFFLINE, res.clone());
      // Cache whatever the offline page needs: its CSS, fonts and icons (every href/src that starts with /).
      const html = await res.text();
      const urls = [...new Set([...html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((m) => m[1]))];
      await Promise.allSettled(urls.map((u) => cache.add(u)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith('vd-') && k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

const isStatic = (path) =>
  /^\/(fonts|img)\//.test(path) || /^\/work\/[^/]+\/thumb\.webp$/.test(path) || /^\/[^/]+\.(ico|png|webmanifest)$/.test(path);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok && url.pathname === '/') {
            const cache = await caches.open(CACHE);
            await cache.put('/', res.clone());
          }
          return res;
        } catch {
          const cache = await caches.open(CACHE);
          return (url.pathname === '/' && (await cache.match('/'))) || (await cache.match(OFFLINE)) || Response.error();
        }
      })(),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      })(),
    );
    return;
  }

  if (isStatic(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const hit = await cache.match(req);
        const refresh = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => undefined);
        if (hit) {
          event.waitUntil(refresh);
          return hit;
        }
        return (await refresh) || Response.error();
      })(),
    );
  }
});
