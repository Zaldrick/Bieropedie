angular.module('app')
  .filter('surcent', function() {
    return function(text) {
      return  text + ' /100';
    };
  });