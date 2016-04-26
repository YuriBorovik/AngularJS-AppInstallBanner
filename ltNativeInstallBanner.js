/**
 *   Created by: Yuri Borovik
 *   Email: yuri.borovik@gmail.com
 *   Date: 13.04.2016
 *   Time: 12:46
 *
 */
(function (angular, app) {
	'use strict';
	app.directive('ltNativeInstallBanner', ['$timeout', function ($timeout) {
		return {
			restrict: 'AE',
			templateUrl: 'ltNativeInstallBanner.html',
			scope: true,
			bindToController: true,
			link: function (scope, elem, attrs) {
				var ua = navigator.userAgent.toLowerCase();
				var isAndroid = ua.indexOf("android")>-1;
				if (!isAndroid()) {
					elem.remove();
					scope.$destroy();
				}
				scope.getBanner = function () {
					elem.velocity({translateY: -166}, {
						duration: 350,
						easing:  'easeOutQuint'
					});
				};

				scope.closeBanner = function () {
					elem.velocity({translateY: 166}, {
						duration: 350,
						easing:  'easeOutQuint',
						complete: function () {
							scope.$destroy();
						}
					});
					// DESCRIPTION APP: SEND GOOGLE ANALYTICS
				};

				scope.goMarket = function () {
					// DESCRIPTION APP: SEND GOOGLE ANALYTICS
				};

				var timer = $timeout(function () {
					scope.getBanner();
				}, 2000);

				scope.$on('$destroy', function () {
					if (angular.isDefined(elem)) {
						elem.remove();
					}
					$timeout.cancel(timer);
				});

			}
		};
	}]);
})(window.angular, window.angular.module('app.ui'));
