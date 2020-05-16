const CACHE_NAME = 'firstpwa-v31';
var urlsToCache = [
	'/',
	'/index.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/init.js',
	'/img/bl0.jpg',
	'/img/bl1.jpg',
	'/img/bl2.jpg',
	'/img/bl3.jpg',
	'/img/hg.jpg',
	'/img/sld1.jpeg',
	'/img/sld2.jpeg',
	'/img/sld3.jpeg'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

