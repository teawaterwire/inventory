(function(){
	'use strict';

	angular.module('inventory', [ 'ngRoute','inventory-main', 'inventory-item','templates' ])
	  .config(function ($routeProvider, $locationProvider) {
	    $routeProvider
		    .when('/balade', {
	          templateUrl: 'main/main.html',
	          controller: 'MainCtrl'
	        })
		    .when('/:objectType/:idKey/:idValue', {
	          templateUrl: 'item/item.html',
	          controller: 'ItemCtrl'
	        })
	      .otherwise({
	        redirectTo: '/balade'
	      });
	    $locationProvider.html5Mode(true);
	  });
	  
})();