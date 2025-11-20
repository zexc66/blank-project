const CACHE_NAME = 'aiba-cache-v1'
const OFFLINE_URLS = [
  '/',
  '/ar',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET') return
  // Cache-first for opportunities list pages
  if (url.pathname.includes('/opportunities')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          const cloned = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned))
          return networkResponse
        })
        return cached || fetchPromise
      })
    )
    return
  }
  // Network-first fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})