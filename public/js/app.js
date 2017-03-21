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
    CarShowControllerFunction
  ])

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
    }

  function CarFactoryFunction($resource) {
  return $resource("/api/cars/:name", {}, {
    update: {method: "PUT"}
  });
}

function CarIndexControllerFunction(CarFactory) {
  this.cars = CarFactory.query()
}


function CarShowControllerFunction(CarFactory, $stateParams) {
    this.car = CarFactory.get({car: $stateParams.car})
  }
