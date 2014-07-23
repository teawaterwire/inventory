(function() {

'use strict';


angular.module('inventory-item')
	.directive('subTable', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      values: '=',
	      display: '='
	    },
	    templateUrl: 'item/sub-table.html'
	  };
	});

})();