(function(){
  'use strict';


  angular.module('inventory-main',['ngRoute', 'ngResource', 'mainService', 'ngAnimate'])
    .controller('MainCtrl', function ($scope, $http, $resource, dataFactory, query, sort) {

      $scope.query = query();
      $scope.subLabels = dataFactory.getSubLabels();
      $scope.isType = dataFactory.isObjectType;
      $scope.tableFields = {};
      $scope.sort = sort;

      var objectType = $scope.query.objectType;
      if (objectType) {
        getSubComponents(objectType);
        search(query());
      }

      dataFactory.getTypes().success(function(data) {
        $scope.types = data.result;
        dataFactory.setTypes(data.result);
      });

      $scope.typeChange = function() {
        var objectType = $scope.query.objectType;
        if (objectType === '') {
          return;
        }
        reset(objectType);
        getSubComponents(objectType);
      };

      function reset(objectType) {
        $scope.results = {};
        if (objectType) {
          $scope.query = {objectType: objectType};
        }
      }

      function getSubComponents(objectType) {
        dataFactory.getSubComponents(objectType).then(function(data) {
          $scope.subComponents = data.result[0];
        });
      }

      $scope.getSubLabels = getSubLabels;

      function getSubLabels(objectType) {
        dataFactory.getSubLabels(objectType).then(function(data) {
          $scope.subLabels[objectType] = data.result[0];
        });
      }

      $scope.fetch = function(label) {
        if ($scope.query[label] === '') {
          delete $scope.query[label];
          reset($scope.objectType);
        } else {
          return search();
        }
      };

      function search() {
        dataFactory.search($scope.query).then(function(data) {
          $scope.error = data.error;
          if (data.count === 0) {
            $scope.results = [];
            return;
          }
          query($scope.query);
          var result = $scope.results = data.result;
          var label = $scope.query.objectType;
          $scope.tableFields[label] = dataFactory.getTableFields(label, result);
        });
      }

    });

})();