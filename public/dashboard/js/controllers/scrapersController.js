dashboardApp.controller('scrapersController', function(
  $scope,
  $location,
  socket,
  $http,
  adService,
  categoryService,
  zoneService,
  urlService,
  scrapeService) {

  'use strict';

  console.log('#### THIS IS THE ENVIRONMENT ####');
  console.log($scope.env);
  $scope.url = $location.$$url;
  $scope.activateNav($scope.url);
  $scope.onload();

  console.log('#### Scraper Controller');

  $scope.zone = [];
  $scope.currzone = '';
  $scope.currcategory = '';
  $scope.categories = [];
  $scope.urls = [];
  $scope.route = '';
  $scope.code = '';

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
      $scope.currcategory = $scope.categories[0];
      $scope.getUrls($scope.currzone, $scope.currcategory);
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  };

  $scope.getUrls = function(zone, cat) {
    $scope.currzone = zone;
    $scope.currcategory = cat;
    var urls = urlService.urls(zone._id, cat._id);
    urls.then(function(resolve) {
      console.log('#### Resolved');
      console.log(resolve);
      $scope.urls = resolve.data;
      if ($scope.route === '' && $scope.code === '') {
        $scope.route = $scope.urls[0].route;
        $scope.code = $scope.urls[0].code;
      }
    }, function(reject) {
      console.log('#### Rejected');
      console.log(reject);
    })
  };


  $scope.check = function() {
    console.log($scope.zones);
    console.log($scope.categories);
    console.log($scope.urls);
  };

  $scope.setUrl = function(url) {
    $scope.route = url.route;
    $scope.code = url.code;
  };

  $scope.updateList = function() {
    var data = {
      message: "Scrape " + $scope.route + ' in ' + $scope.currzone.name,
      code: $scope.code,
      route: $scope.route,
      zone: $scope.currzone.name
    };
    $scope.list.push(data);
  };

  $scope.removeAd = function(ad) {
    for (var i = 0; i < $scope.list.length; i++) {
      if (ad._id === $scope.list[i]._id) {
        $scope.list.splice(i, 1);
        break;
      }
    }
    console.log('removed ad');
  };

  socket.on('starting scraper', function(data) {
    console.log('data from schedules.js');
    console.log(data);
  });

  socket.on('error occured', function(err) {
    console.log(err);
  });

  $scope.index = 0;
  $scope.scrapeAll = function() {
    $scope.miniStatus();
    console.log($scope.list);
    $scope.scrape = function(index) {
      if ($scope.list.length > index) {
        console.log($scope.list.length);
        console.log($scope.index);
        var data = $scope.list[$scope.index];
        var scrape = scrapeService.scrape(data.route, data.zone, data.code);
        scrape.then(function(resolve) {
          console.log('#### Resolved');
          console.log(resolve);
          $scope.scrapeCats.push(resolve.data);
        }, function(reject) {
          console.log('#### Rejected');
          console.log(reject);
        })
      } else {
        console.log('done looping through this shit');
        $scope.index = 0;
        $scope.list = [];
      }
    };
    socket.on('scraped ads', function(data) {
      console.log('scraped url');
      console.log(data);
      $scope.index = $scope.index + 1;
      if ($scope.list.length > $scope.index) {
        $scope.scrape($scope.index);
      } else {
        $scope.$apply(function() {
          $scope.index = 0;
          $scope.list = [];
        });

      }
    });
    $scope.scrape($scope.index);
  };

  $scope.getZones();
});
