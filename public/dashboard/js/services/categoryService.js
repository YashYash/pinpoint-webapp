dashboardApp.service('categoryService', function(
  $rootScope,
  $http) {

  console.log('#### Category Service');
  return {
    categories: function() {
      var url = '/api/categories';
      return $http.get(url)
    }
  }
});
