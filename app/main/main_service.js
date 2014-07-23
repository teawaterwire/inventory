(function(){
  'use strict';

    angular.module('mainService', ['ngResource', 'appService'])
    	.factory('sort', function(){
    		return {
    			predicate: '',
    			change: function(val) {
    				this.predicate = val;
    			}
    		};
    	})
    	.factory('query', function($location) {
    		var query = {};
    		return function(val) {
    			if (val) {
    				query = val;
    				$location.search(val);
    				return;
    			}
    			if (typeof $location.search().objectType != 'undefined') {
    				return $location.search();
    			}
    			return query;
    		};
    	})
    	.factory('dataFactory', function($http, $resource, utils) {
    		var dataFactory = {};
    		var urlBase = 'http://inventory.dev.dailymotion.com/api';
    		var urlSchema = urlBase + '/:objectType/schema';
    		var urlSearch = urlBase + '/:objectType/search';
    		var types = [];
    		var pluralTypes = [];
    		var subLabels = {};
    		dataFactory.setTypes = function(vals) {
    			types = vals;
    		};
    		dataFactory.getTypes = function() {
    			return $http.get(urlBase);
    		};
    		var getPluralTypes = function() {
    			if (pluralTypes.length) {
    				return pluralTypes;
    			}
    			pluralTypes = types.map(function(type) {
    				return type + 's';
    			});
    			return pluralTypes;
    		};
    		dataFactory.isObjectType = function(label) {
    			return (types.indexOf(label) !== -1) || (getPluralTypes().indexOf(label) !== -1);
    		};
    		dataFactory.getSubComponents = function(type) {
    			return $resource(urlSchema)
    				.get({objectType: type})
    				.$promise;
    		};
    		dataFactory.getSubLabels = function(type) {
    			if (!type) {
    				return subLabels;
    			}
    			var cleanType = getPluralTypes().indexOf(type) !== -1 ? type.slice(0, -1) : type;
    			return $resource(urlSchema)
    				.get({objectType: cleanType})
    				.$promise;
    		};
    		dataFactory.search = function(query) {
    			return $resource(urlSearch)
    				.get(query)
    				.$promise;
    		};
    		var tableField = {};
    		dataFactory.getTableFields = function(label, results) {
    			if (tableField[label]) {
    				return tableField[label];
    			}
    			// results is supposed to have at least one entry
    			var firstResult = results[0];
    			var fields = [];
    			for (var field in firstResult) {
    				var fieldType = utils.getObjectType(firstResult[field]);
					if (firstResult[field] && fieldType !== 'Object' && fieldType !== 'Array') {
					  fields.push(field);
					}
				}
				tableField[label] = fields;
				return fields;
    		};


    		return dataFactory;
    	});

})();