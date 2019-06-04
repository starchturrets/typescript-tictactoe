//Thank God for Brad Traversy Media
const cacheName = 'v2';
const cacheAssets = [
	//Stuff to cache
	'/',
	'index.html',
	'sw.js',
	'/manifest.json',
	'/src/js/index.js',
	'/src/style.css',
	'/src/assets/apple-touch-icon.png',
	'/src/assets/favicon-32x32.png',
	'/src/assets/favicon-16x16.png',
	'/src/assets/safari-pinned-tab.svg',
	'/src/assets/favicon.ico',
	'/src/assets/browserconfig.xml'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(cacheAssets);
		})
	);
});

//Call Activate Event
self.addEventListener('activate', (e) => {
	console.log('Service Worker: Activated');
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		ajax(e.request).catch(() => {
			console.log(e.request);
			return caches.match(e.request);
		})
	);
});
//TODO: wrap the fetch request in another promise, and abort it after ~5 seconds
function ajax(url, timeout = 1000) {
	return new Promise((resolve, reject) => {
		fetch(url)
			// .then((res) => res.json())
			.then((data) => resolve(data));
		setTimeout(() => reject('Request failed'), timeout);
	});
}
