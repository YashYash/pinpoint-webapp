dashboardApp.service('scrapeService', function(
  $rootScope,
  $http) {

  console.log('#### Scrape Service');
  return {
    scrape: function(route, zone, code) {
      var url = '/scrape/kijiji/' + route + '/' + zone + '/' + code + '/1';
      return $http.get(url);
    }
  }
});
