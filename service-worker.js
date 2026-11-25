// SpinMaster TT: works offline once opened, but always prefers the newest files when online.
const CACHE = 'spinmaster-tt-v11';
const SHELL = ['./', 'index.html', 'style.css', 'fb.js', 'firebase-config.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'inter-latin-400-normal.woff2', 'inter-latin-600-normal.woff2', 'inter-latin-700-normal.woff2', 'inter-latin-900-normal.woff2', 'teko-latin-700-normal.woff2'];

self.addEventListener('install', (e) => {
  // one missing file must never stop the install, so every file is cached on its own
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// network first (so an update shows up straight away), the saved copy when offline.
// Only this site's own files are handled: Firebase and the live-score relay always go straight to the network.
self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {      // always ask the server if the file changed (GitHub Pages otherwise lets browsers keep it for 10 minutes)
      if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
