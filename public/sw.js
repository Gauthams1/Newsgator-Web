var CACHE_NAME = 'v2';
var urlsToCache = [
  "/video-js-6.2.6/video.js",
  "/js/watermark.js",
  "/js/jquery-3.1.1.min.js",
  "/js/flickity.min.js",
  "/js/easypiechart.min.js",
  "/js/parallax.js",
  "/js/typed.min.js",
  "/js/datepicker.js",
  "/js/isotope.min.js",
  "/js/ytplayer.min.js",
  "/js/lightbox.min.js",
  "/js/granim.min.js",
  "/js/jquery.steps.min.js",
  "/js/countdown.min.js",
  "/js/twitterfetcher.min.js",
  "/js/spectragram.min.js",
  "/js/smooth-scroll.min.js",
  "/js/scripts.js",
  "/js/custom.js",
  "/css/bootstrap.css",
  "/css/stack-interface.css",
  "/css/socicon.css",
  "/css/lightbox.min.css",
  "/css/flickity.css",
  "/css/iconsmind.css",
  "/css/jquery.steps.css",
  "/css/theme.css",
  "/css/custom.css",
  "/video-js-6.2.6/video-js.css",
  "https://fonts.googleapis.com/css?family=Montserrat",
  "/assets/vendor/modernizr/modernizr.js",
  "/assets/vendor/jquery/jquery.js",
  "/assets/vendor/jquery-browser-mobile/jquery.browser.mobile.js",
  "/assets/vendor/bootstrap/js/bootstrap.js",
  "/assets/vendor/nanoscroller/nanoscroller.js",
  "/assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js",
  "/assets/vendor/magnific-popup/magnific-popup.js",
  "/assets/vendor/jquery-placeholder/jquery.placeholder.js",
  "/assets/vendor/jquery-ui/js/jquery-ui-1.10.4.custom.js",
  "/assets/vendor/jquery-ui-touch-punch/jquery.ui.touch-punch.js",
  "/assets/vendor/jquery-appear/jquery.appear.js",
  "/assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js",
  "/assets/vendor/jquery-easypiechart/jquery.easypiechart.js",
  "/assets/vendor/flot/jquery.flot.js",
  "/assets/vendor/flot-tooltip/jquery.flot.tooltip.js",
  "/assets/vendor/flot/jquery.flot.pie.js",
  "/assets/vendor/flot/jquery.flot.categories.js",
  "/assets/vendor/flot/jquery.flot.resize.js",
  "/assets/vendor/jquery-sparkline/jquery.sparkline.js",
  "/assets/vendor/raphael/raphael.js",
  "/assets/vendor/morris/morris.js",
  "/assets/vendor/gauge/gauge.js",
  "/assets/vendor/snap-svg/snap.svg.js",
  "/assets/vendor/liquid-meter/liquid.meter.js",
  "/assets/vendor/jqvmap/jquery.vmap.js",
  "/assets/vendor/jqvmap/data/jquery.vmap.sampledata.js",
  "/assets/vendor/jqvmap/maps/jquery.vmap.world.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.africa.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.asia.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.australia.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.europe.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.north-america.js",
  "/assets/vendor/jqvmap/maps/continents/jquery.vmap.south-america.js",
  "/assets/javascripts/theme.js",
  "/assets/javascripts/theme.custom.js",
  "/assets/javascripts/theme.init.js",
  "http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light",
  "/assets/vendor/bootstrap/css/bootstrap.css",
  "/assets/vendor/font-awesome/css/font-awesome.css",
  "/assets/vendor/magnific-popup/magnific-popup.css",
  "/assets/vendor/bootstrap-datepicker/css/datepicker3.css",
  "/manifest.json",
  "/assets/vendor/jquery-ui/css/ui-lightness/jquery-ui-1.10.4.custom.css",
  "/assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css",
  "/assets/vendor/morris/morris.css",
  "/assets/stylesheets/theme.css",
  "/assets/stylesheets/skins/default.css",
  "/assets/stylesheets/theme-custom.css"
];
self.addEventListener('install',
	function(event) {
		// Perform install steps
		console.log(
			"[serviceworker] install");
		event.waitUntil(caches.open(
			CACHE_NAME).then(function(cache) {
			//console.log(urlsToCache);
			return cache.addAll(urlsToCache);
		}));
	});
self.addEventListener('activate',
	function(event) {
		// Perform install steps
		//console.log("[serviceworker] activate");
		event.waitUntil(caches.keys().then(
			function(name) {
				return Promise.all(name.map(
					function(cname) {
						if(cname !== CACHE_NAME)
							return caches.delete(cname);
					}))
			}))
	});

self.addEventListener('fetch', function(event) {
  // Perform install steps

  event.respondWith(
caches.match(event.request).then(function(response){
  if (response)
  {//console.log("[serviceworker]respond found for "+event.request.url);
    return response;
  }
//  console.log("[serviceworker] respond not found for "+event.request.url);
  return fetch(event.request);

})
  )

});
self.addEventListener('push', function(
	event) {
	var text = event.data.text();
	// var title = text.title;
	// var body = text.body;
	// var icon = text.icon;
  console.log(event.data.text());
	const myFirstPromise = new Promise((
		resolve, reject) => {
		self.registration.showNotification(
			"Newsgator", {
				body: text
			})
	})
	event.waitUntil(myFirstPromise);
});
self.onnotificationclick = function(
	event) {
	event.notification.close();
	const notcl = new Promise((resolve,
		reject) => {
		clients.matchAll({
			type: "window"
		}).then(function(clientList) {
			for(var i = 0; i < clientList.length; i++) {
				var client = clientList[i];
				if('focus' in client) return client
					.focus();
			}
			if(clients.openWindow) return clients
				.openWindow('/');
		})
	})
	event.waitUntil(notcl);
};
