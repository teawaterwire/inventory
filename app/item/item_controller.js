(function(){
  'use strict';

  angular.module('inventory-item',['ngRoute', 'ngResource', 'appService', 'mainService'])
    .controller('ItemCtrl', function ($scope, $resource, $routeParams, utils, query) {
      $scope.params = $routeParams;
      var getObject = $resource('http://inventory.dev.dailymotion.com/api/:objectType/get/:idKey/:idValue');
      var results = getObject.get($routeParams, function() {
        if (results.error || results.count === 0) {
          return;
        }
        $scope.item = results.result[0];
      });

      $scope.getType = function(val) {
        return utils.getObjectType(val);
      };

    });

})();