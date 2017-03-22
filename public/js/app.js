angular
  .module("CarApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("CarFactory", [
    "$resource",
    CarFactoryFunction
  ])
  .controller("CarIndexController", [
    "CarFactory",
    CarIndexControllerFunction
  ])
  .controller("CarShowController", [
    "CarFactory",
    "$stateParams",
    "$state",
    CarShowControllerFunction
  ])
  .controller("CarNewController", [
    "CarFactory",
    "$state",
    CarNewControllerFunction
  ])
  // .controller("CarEditController", [
  //   "CarFactory",
  //   "$state",
  //   "$stateParams",
  //   CarEditControllerFunction
  // ])

  function Router($stateProvider) {
    $stateProvider
    .state("index", {
      url: "/cars",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "CarIndexController",
      controllerAs: "vm"
      })
    .state("show", {
      url: "/cars/:car",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "CarShowController",
      controllerAs: "vm"
      })
    .state("new", {
      url: "/cars",
      templateUrl: "/assets/js/ng-views/new.html",
      controller: "CarNewController",
      controllerAs: "vm"
    })
    .state("edit", {
      url: "/cars/:car/edit",
      templateUrl: "/assets/js/ng-views/edit.html",
      controller: "CarEditController",
      controllerAs: "vm"
    })

  }

  function CarFactoryFunction($resource) {
  return $resource("/api/cars/:car", {}, {
    update: {method: "PUT"},
    query: { method: "GET", params: {}, isArray: true },
    get: { method: "GET", params: {}, isArray: false },
    create: {method: "POST", params: {}
    }
  });
}

function CarIndexControllerFunction(CarFactory) {
  this.cars = CarFactory.query()
}

function CarShowControllerFunction(CarFactory, $stateParams, $state) {
  this.car = CarFactory.get({car: $stateParams.car})
  this.update = function() {
    this.car.$update({car: $stateParams.car}).then(function() {
      $state.go("index")
    })
  }
  this.destroy = function() {
    this.car.$delete({car: $stateParams.car}).then(function() {
      $state.go("index");
    })
  }
}

function CarNewControllerFunction(CarFactory, $state) {
  this.car = new CarFactory();
  this.create = function() {
    this.car.$save(function(car) {
      $state.go("index", {car: car.car})
    })
  }
}
// function CarEditControllerFunction(CarFactory, $state, $stateParams) {
//   this.car = new CarFactory();
//   this.create = function() {
//     this.car.$save(function(car) {
//       $state.go("index", {car: car.car})
//     })
//   }
// }
