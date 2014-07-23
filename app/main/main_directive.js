(function() {

'use strict';


angular.module('inventory-main')
	.directive('sortIcon', function(sort) {
	  var prefix = '+';
	  return {
	    restrict: 'A',
	    transclude: true,
	    template: '<span class="glyphicon glyphicon-sort"></span>',
	    link: function(scope, element) {
	    	element.on('click', function(e) {
	    		e.preventDefault();
	    		prefix = prefix === '+' ? '-' : '+';
	    		var predicate = prefix + scope.tableField;
	    		scope.$apply(function() {
	    			sort.change(predicate);
	    		});
	    	});
	    }
	  };
	});

})();