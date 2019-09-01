/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "android-chrome-144x144.png",
    "revision": "47f65c356a4521df8dfc3e20f10600c9"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "23652e031d00bae01e3f18c2b7043e1c"
  },
  {
    "url": "android-chrome-256x256.png",
    "revision": "2856132f6185017e9051422208bf2374"
  },
  {
    "url": "android-chrome-36x36.png",
    "revision": "9be331ac164d823ecf915251beb3918c"
  },
  {
    "url": "android-chrome-384x384.png",
    "revision": "d77125aa5ba943e7e94090627620ea19"
  },
  {
    "url": "android-chrome-48x48.png",
    "revision": "1189dcf34856bf04057674d7b00a1526"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "35eda6eccd15fc7d75548c11c290bd95"
  },
  {
    "url": "android-chrome-72x72.png",
    "revision": "a9831ae09f98aaa9c38749f72a66ca3b"
  },
  {
    "url": "android-chrome-96x96.png",
    "revision": "638b13a0f481394418afad3640d801fa"
  },
  {
    "url": "apple-touch-icon-1024x1024.png",
    "revision": "ba04b1f53a1d7d8b359f4babdc6ff6da"
  },
  {
    "url": "apple-touch-icon-114x114.png",
    "revision": "3f0d97bc8617bfbe81fa5919e043c12a"
  },
  {
    "url": "apple-touch-icon-120x120.png",
    "revision": "fb5b21f840bfce01ac2447e901065782"
  },
  {
    "url": "apple-touch-icon-144x144.png",
    "revision": "66d7b07fc7d4eaeb40574328f9b7e7af"
  },
  {
    "url": "apple-touch-icon-152x152.png",
    "revision": "ab60af9270cc16b679cbe06c0df5815a"
  },
  {
    "url": "apple-touch-icon-167x167.png",
    "revision": "e6309c161f344aef782170cd3d116a12"
  },
  {
    "url": "apple-touch-icon-180x180.png",
    "revision": "a1c78055bbe6853c091e6525a3c3abb7"
  },
  {
    "url": "apple-touch-icon-57x57.png",
    "revision": "07cc6c44e61b3de3069a31df0fb0b4f3"
  },
  {
    "url": "apple-touch-icon-60x60.png",
    "revision": "fb14c8d4673d2152357f905713ac1a55"
  },
  {
    "url": "apple-touch-icon-72x72.png",
    "revision": "f108a2373cca02da75c78d547704d4c0"
  },
  {
    "url": "apple-touch-icon-76x76.png",
    "revision": "4a4c973b3a9ebd7582187b7eb3dc0621"
  },
  {
    "url": "apple-touch-icon-precomposed.png",
    "revision": "a1c78055bbe6853c091e6525a3c3abb7"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "a1c78055bbe6853c091e6525a3c3abb7"
  },
  {
    "url": "apple-touch-startup-image-1182x2208.png",
    "revision": "1492eb518063a629641fef6bdde4ad83"
  },
  {
    "url": "apple-touch-startup-image-1242x2148.png",
    "revision": "dd4525a4fec0cf96871897a883c138ee"
  },
  {
    "url": "apple-touch-startup-image-1496x2048.png",
    "revision": "c6b2facc64a893409946a496ef38b472"
  },
  {
    "url": "apple-touch-startup-image-1536x2008.png",
    "revision": "ac10352102a435e34993ff5dd3942372"
  },
  {
    "url": "apple-touch-startup-image-320x460.png",
    "revision": "47eb302bdfa850afaedaa9fffa2242ad"
  },
  {
    "url": "apple-touch-startup-image-640x1096.png",
    "revision": "ed32ebdfec5f42061509bb0063ed7ed1"
  },
  {
    "url": "apple-touch-startup-image-640x920.png",
    "revision": "4a56cf2a5d7a34d7a650fde8397926f1"
  },
  {
    "url": "apple-touch-startup-image-748x1024.png",
    "revision": "d3744ff4cd347f59bd34a6cb493c6d74"
  },
  {
    "url": "apple-touch-startup-image-750x1294.png",
    "revision": "4e7062cdc69814a772d1e43ba99c086c"
  },
  {
    "url": "apple-touch-startup-image-768x1004.png",
    "revision": "fb656c95197db0cac3a45d45a6580c39"
  },
  {
    "url": "coast-228x228.png",
    "revision": "71fc4ab945f743f4f23a961f108fab35"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "2ee40c2b2d84e72f3b75c10ceb8a0c57"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "c3e3156197b976d2403959e00d7d92c0"
  },
  {
    "url": "firefox_app_128x128.png",
    "revision": "9bd85ba9f0774d0125139f2333fb1807"
  },
  {
    "url": "firefox_app_512x512.png",
    "revision": "cc8cb942a0c5760790cfe4d12b92e89d"
  },
  {
    "url": "firefox_app_60x60.png",
    "revision": "d8fe1bac386bbad22244a1a1befa95c7"
  },
  {
    "url": "index.html",
    "revision": "0ee7fc920630f31dd701849c5bd6009b"
  },
  {
    "url": "mstile-144x144.png",
    "revision": "47f65c356a4521df8dfc3e20f10600c9"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "09c34729d40e4ea2c64b592421a6cf81"
  },
  {
    "url": "mstile-310x150.png",
    "revision": "b74fb63d2f0344a98b0de436a05b00a2"
  },
  {
    "url": "mstile-310x310.png",
    "revision": "e75616af1a163720739ca431b2fe6f45"
  },
  {
    "url": "mstile-70x70.png",
    "revision": "b2d3393584c3a02d7a6e4b13e3d12ae2"
  },
  {
    "url": "scss.2f1f8964.css",
    "revision": "8a0aec1d6a66545924ed14f6026cd16e"
  },
  {
    "url": "src.83cb1270.js",
    "revision": "7d53ffc98bb97c02361e60d05bb71b75"
  },
  {
    "url": "yandex-browser-50x50.png",
    "revision": "c236c53c13bb41e08ed10d9693c82cfe"
  },
  {
    "url": "/",
    "revision": "517a3878634dba08489a57f9d65cc130"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
