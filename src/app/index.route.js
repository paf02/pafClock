(function() {
  'use strict';

  angular
    .module('tickTock')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('analogClock', {
        url: "/analogClock",
        templateUrl: 'app/partials/analogClock/analogClock.html'
        // controller: 'AnalogClockController',
        // controllerAs: 'aC'
      })
      .state('digitalClock', {
        url: "/digitalClock",
        templateUrl: 'app/partials/digitalClock/digitalClock.html'
        // controller: 'DigitalClockController',
        // controllerAs: 'dC'
      });

    $urlRouterProvider.otherwise("/analogClock");
  }

})();
