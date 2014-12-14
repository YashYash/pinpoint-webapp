dashboardApp.service('zoneService', function(
  $rootScope,
  $http) {

  console.log('#### Zone Service');
  return {
    zones: function() {
      var url = '/api/zones';
      return $http.get(url)
    }
  }
});
