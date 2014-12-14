dashboardApp.service('urlService', function(
  $rootScope,
  $http) {

  return {
    urls: function(zone, cat) {
      var url = '/api/urls/' + zone + '/' + cat;
      return $http.get(url)
    }
  }
});
