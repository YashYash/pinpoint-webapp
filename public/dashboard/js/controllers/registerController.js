dashboardApp.controller('registerController', function(
  $scope,
  authService) {
  'use strict'
  console.log('#### Register Admin');
  $scope.auth = {
    username: '',
    password: '',
    email: ''
  }
  $scope.register = function() {
    var register = authService.register($scope.auth);
    console.log($scope.auth);
    register.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  }
})
