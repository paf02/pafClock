(function() {
  'use strict';

  angular
    .module('tickTock')
    .directive('tickTockAlarms', tickTockAlarms);

  /** @ngInject */
  function tickTockAlarms() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/alarms/alarms.html',
      scope: {
          alarmsDetails: '='
      },
      controller: AlarmsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function AlarmsController($scope, moment) {
      var vm = this,
          elCounter = 0,
          panelActive = false;
          
      vm.alarmsSets = [obj()];
      

      function obj() {
        var t = {
          name: '',
          h: 0,
          m: 0,
          time: '',
          ring: 0,
          active: false,
          id: elCounter,
          repeat: {
            'm': false,
            't': false,
            'w': false,
            'r': false,
            'f': false,
            's': false,
            'u': false
          }
        };

        return t;
      };

      vm.activeAlarm = function(alarmActive) {
        alarmActive.active = !alarmActive.active;
        var mom = moment({ hour: alarmActive.h, minute: alarmActive.m});
        alarmActive.time = mom.format('HH:mm');
        $scope.$root.$broadcast('ALARMS_SET', vm.alarmsSets);
      }

      vm.showAlarmPanel = function() {
        panelActive = !panelActive;
        $scope.$root.$broadcast('PANNEL_TOGGLE', panelActive);
      }

      vm.deleteAlarm = function(alarmActive) {
        var index = vm.alarmsSets.indexOf(alarmActive);
        vm.alarmsSets.splice(index, 1);
      };  

      vm.addAlarm = function(alarmActive) {
        elCounter++;
        vm.alarmsSets[vm.alarmsSets.length] = obj();
      }; 
      

      vm.activeDate = function(day, alarmActive) {

        alarmActive.repeat[day] = !alarmActive.repeat[day];
      };
    }
  }

})();
