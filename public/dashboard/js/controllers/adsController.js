dashboardApp.controller('adsController', function(
  $scope,
  $location,
  socket,
  $http,
  adService,
  categoryService,
  urlService,
  scrapeService,
  zoneService) {

  'use strict';
  console.log('#### Ads Controller');

  $scope.url = $location.$$url;
  $scope.activateNav($scope.url);
  $scope.onload();
  $scope.tiles = 'true';
  $scope.limit = 25;

  $scope.getZones = function() {
    var zones = zoneService.zones();
    zones.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.zones = resolve.data;
      $scope.currzone = $scope.zones[0];
      $scope.getCategories();
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  }

  $scope.getCategories = function() {
    var categories = categoryService.categories();
    categories.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.categories = resolve.data;
      $scope.currcat = $scope.categories[0];
      $scope.getUrls($scope.currzone, $scope.currcat);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  };

  $scope.getUrls = function(zone, cat) {
    $scope.currzone = zone;
    $scope.currcat = cat;
    var urls = urlService.urls(zone._id, cat._id);
    urls.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.urls = resolve.data;
      $scope.getAds($scope.currzone, $scope.currcat);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  };

  $scope.getAds = function(zone, category) {
    $scope.currzone = zone;
    $scope.currcat = category;
    var ads = adService.ads(zone, category);
    ads.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.ads = resolve.data;
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
    console.log($scope.currzone, $scope.currcat);
  };

  $scope.allAds = function() {
    var ads = adService.all();
    ads.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.ads = resolve.data;
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  }
  socket.on('update scope', function(data) {
    console.log('Socket message: ');
    console.log(data);
    if (data.zone.length > 1 && data.category !== null) {
      var sendzone = {
        shortname: data.zone
      };
      var sendcat = {
        _id: data.category
      };
      $scope.getAds(sendzone, sendcat);
    } else {
      $scope.getZones();
    }
  });

  $scope.getZones();
});
