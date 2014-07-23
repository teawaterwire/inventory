(function() {

	'use strict';

	angular.module('appService', [])
		.factory('utils', function() {
			var utils = {};
			utils.getObjectType = function(obj) {
				return Object.prototype.toString.call(obj).slice(8, -1);
			};
			return utils;
		});


})();