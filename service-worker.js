self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());

  caches.open('my-cache').then(cache => {
    cache.addAll([
      '/',
      'index.html',
      'bundle.css',
      'bundle.js',
      'manifest.json',
      /*'players.json',
      'assets/players/alphonse-areola.jpeg',
      'assets/players/hugo-lloris.jpeg',
      'assets/players/steve-mandanda.jpeg',
      'assets/players/lucas-hernandez.jpeg',
      'assets/players/djibril-sidibe.jpeg',
      'assets/players/benjamin-pavard.jpeg',
      'assets/players/raphael-varane.jpeg',
      'assets/players/adil-rami.jpeg',
      'assets/players/samuel-umtiti.jpeg',
      'assets/players/presnel-kimpembe.jpeg',
      'assets/players/benjamin-mendy.jpeg',
      'assets/players/paul-pogba.jpeg',
      'assets/players/ngolo-kante.jpeg',
      'assets/players/blaise-matuidi.jpeg',
      'assets/players/corentin-tolisso.jpeg',
      'assets/players/steven-nzonzi.jpeg',
      'assets/players/kylian-mbappe.jpeg',
      'assets/players/ousmane-dembele.jpeg',
      'assets/players/olivier-giroud.jpeg',
      'assets/players/antoine-griezmann.jpeg',
      'assets/players/nabil-fekir.jpeg',
      'assets/players/thomas-lemar.jpeg',
      'assets/players/florian-thauvin.jpeg',*/
      'assets/players/footix.jpg',
    ])
  })
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

//////////// caching strategy //////////////////////

// cache first
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// network first
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });

// Stale-While-Revalidate
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         var fetchPromise = fetch(event.request).then(function(networkResponse) {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         })
//         return response || fetchPromise;
//       })
//     })
//   );
// });


// REPLACE EVERY IMAGES (.JPEG)
/* self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.jpeg')) {
    event.respondWith(caches.match('assets/players/footix.jpg'));
  }
}); */