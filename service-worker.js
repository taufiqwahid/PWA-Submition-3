importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js",
);
if (workbox) console.log("Workbox berhasil dimuat");
else console.log("Workbox gagal dimuat");

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/article.html", revision: "1" },
    { url: "/pages/competition.html", revision: "1" },
    { url: "/pages/team.html", revision: "1" },
    { url: "/pages/saved.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/cek-sw.js", revision: "1" },
    { url: "/js/notif.js", revision: "1" },
    { url: "/assets/icons/android-icon-36x36.png", revision: "1" },
    { url: "/assets/icons/android-icon-48x48.png", revision: "1" },
    { url: "/assets/icons/android-icon-72x72.png", revision: "1" },
    { url: "/assets/icons/android-icon-96x96.png", revision: "1" },
    { url: "/assets/icons/android-icon-144x144.png", revision: "1" },
    { url: "/assets/icons/icon256x256.png", revision: "1" },
    { url: "/assets/icons/icon384x384.png", revision: "1" },
    { url: "/assets/icons/icon512x512.png", revision: "1" },
    { url: "/assets/icons/ms-icon-144x144.png", revision: "1" },
    { url: "/assets/icons/apple-icon-57x57.png", revision: "1" },
    { url: "/assets/icons/apple-icon-60x60.png", revision: "1" },
    { url: "/assets/icons/apple-icon-72x72.png", revision: "1" },
    { url: "/assets/icons/apple-icon-76x76.png", revision: "1" },
    { url: "/assets/icons/apple-icon-114x114.png", revision: "1" },
    { url: "/assets/icons/apple-icon-120x120.png", revision: "1" },
    { url: "/assets/icons/apple-icon-144x144.png", revision: "1" },
    { url: "/assets/icons/apple-icon-152x152.png", revision: "1" },
    { url: "/assets/icons/favicon-16x16.png", revision: "1" },
    { url: "/assets/icons/favicon-32x32.png", revision: "1" },
    { url: "/assets/icons/favicon-96x96.png", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  },
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api-data",
  }),
);

workbox.routing.registerRoute(
  new RegExp("pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  }),
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  );
});

// const CACHE_NAME = "football-v1";
// var urlsToCache = [
//   "/",
//   "/index.html",
//   "/nav.html",
//   "/article.html",
//   "/pages/competition.html",
//   "/pages/team.html",
//   "/pages/saved.html",
//   "/css/materialize.min.css",
//   "/manifest.json",
//   "/js/nav.js",
//   "/js/materialize.min.js",
//   "/js/api.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/cek-sw.js",
//   "/js/notif.js",
//   "/assets/icons/android-icon-36x36.png",
//   "/assets/icons/android-icon-48x48.png",
//   "/assets/icons/android-icon-72x72.png",
//   "/assets/icons/android-icon-96x96.png",
//   "/assets/icons/android-icon-144x144.png",
//   "/assets/icons/icon256x256.png",
//   "/assets/icons/icon384x384.png",
//   "/assets/icons/icon512x512.png",
//   "/assets/icons/ms-icon-144x144.png",
//   "/assets/icons/apple-icon-57x57.png",
//   "/assets/icons/apple-icon-60x60.png",
//   "/assets/icons/apple-icon-72x72.png",
//   "/assets/icons/apple-icon-76x76.png",
//   "/assets/icons/apple-icon-114x114.png",
//   "/assets/icons/apple-icon-120x120.png",
//   "/assets/icons/apple-icon-144x144.png",
//   "/assets/icons/apple-icon-152x152.png",
//   "/assets/icons/favicon-16x16.png",
//   "/assets/icons/favicon-32x32.png",
//   "/assets/icons/favicon-96x96.png",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     }),
//   );
// });

// // var token = "56e0ea311d714bfa9a6e1b1ce934dd62";

// self.addEventListener("fetch", function (event) {
//   var base_url = "http://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       }),
//     );
//   } else {
//     event.respondWith(
//       caches
//         .match(event.request, { ignoreSearch: true })
//         .then(function (response) {
//           return response || fetch(event.request);
//         }),
//     );
//   }
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log(`ServiceWorker : cache ${cacheName} dihapus !!`);
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
// });
