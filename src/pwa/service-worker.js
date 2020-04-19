self.addEventListener('message', (event) => {
  if (event.data && event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

workbox.core.clientsClaim()
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
