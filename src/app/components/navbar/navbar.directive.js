(function() {
  'use strict';

  angular
    .module('tickTock')
    .directive('tickTockNavbar', tickTockNavbar);

  /** @ngInject */
  function tickTockNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          clockFormat: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
      
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $state) {
      var vm = this;
      vm.navCollapsed = true;
      vm.isActive = true;
      vm.clockFormats = { 0:{ format: '12' }, 1:{ format: '24' } };
      

      vm.anaClo = function() {
        vm.toggleMenu();
        goTo('analogClock');
      };

      vm.digClo = function() {
        vm.toggleMenu();
        goTo('digitalClock');
      };

      vm.toggleMenu = function() {
        vm.navCollapsed = !vm.navCollapsed;
      };

      vm.toggleClock = function() {
        vm.isActive = !vm.isActive;

        if (vm.isActive) {
          vm.clockFormat = vm.clockFormats[0];
        } else {
          vm.clockFormat = vm.clockFormats[1];
        }

        sendTypeClock(vm.clockFormat);
      };

      function init() {
        vm.clockFormat = vm.clockFormats[0];
        sendTypeClock(vm.clockFormat);
      }

      function goTo(stateName) {
        $state.go(stateName);
      }

      function sendTypeClock() {
        $scope.$root.$broadcast('CLOCK_FORMAT_CHOOSE', vm.clockFormat);
      }

      init();
    }
  }

})();
