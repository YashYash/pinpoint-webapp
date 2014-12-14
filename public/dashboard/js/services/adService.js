dashboardApp.service('adService', function(
  $rootScope,
  $http) {

  console.log('#### Ad Service');
  return {
    all: function() {
      var url = '/api/ads/';
      return $http.get(url);
    },
    ads: function(zone, category) {
      var url = '/api/ads/' + zone.shortname + '/' + category._id;
      return $http.get(url);
    }
  }
});
