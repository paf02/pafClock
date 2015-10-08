(function() {
  'use strict';

  angular
    .module('tickTock')
    .directive('a', function() {
      return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
          if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
            elem.on('click', function(e){
              e.preventDefault();
            });
          }
        }
      };
    }) 
    .controller('MainController', MainController);


  function MainController($interval, $scope, moment) {
    var vm = this;
    vm.panelActive = false;
    vm.alarmsSets = null;
    vm.formatChoose = {
      template: '',
      format24: false
    };
    vm.hours = '';
    vm.mins = '';
    vm.secs = '';
    vm.aa = '';

    var beep = new Audio('http://mikevanrossum.nl/stuff/doorbell.mp3');

    // $scope.$watch(function() {
    //   return vm.clockFormat;
    // }, function(current, original) {
    //   try {
    //     // console.log('vm.title is now %s', current.format);

    //     switch (current.format) {
    //       case '12': 
    //         vm.formatChoose.template = 'hh:mm:ss a';
    //         vm.formatChoose.format24 = false;
    //       break;
    //       case '24':
    //         vm.formatChoose.template = 'HH:mm:ss';
    //         vm.formatChoose.format24 = true;
    //       break;
    //     }
        
    //   } catch(e) { }
    // });

// alarmsDetail

    $scope.$on('CLOCK_FORMAT_CHOOSE', function(e, data) {
      try {
        // console.log('vm.title is now %s', data.format);

        switch (data.format) {
          case '12': 
            vm.formatChoose.template = 'hh:mm:ss a';
            vm.formatChoose.format24 = false;
          break;
          case '24':
            vm.formatChoose.template = 'HH:mm:ss';
            vm.formatChoose.format24 = true;
          break;
        }
        
      } catch(e) { }
    });

    $scope.$on('PANNEL_TOGGLE', function(e, data) {
      try {
        // console.log(data);
        vm.panelActive = data;
      } catch(e) { }
    });

    $scope.$on('ALARMS_SET', function(e, data) {
      try {
        vm.alarmsSets = data;
      } catch(e) { }
    });

    var checkMatch = function(val) {
      for (var i = 0; i < vm.alarmsSets.length; i++) {
        if (vm.alarmsSets[i].active) {
          if (vm.alarmsSets[i].time === val) {
            console.log(vm.alarmsSets[i].name);
            vm.alarmsSets[i].ring++;
            setTimeout( function() { beep.play(); }, 1000 * vm.alarmsSets[i].ring );
            if (vm.alarmsSets[i].ring === 3) {
              vm.alarmsSets[i].ring = 0;
              vm.alarmsSets[i].active = 0;
              break;
            }
          }
        }
      }
    };

    var setAnalogClock = function () {
      var hours = moment().format('hh'),
          minute = moment().format('mm'),
          seconds = moment().format('ss'),
          hourRotate,
          minRotate,
          secRotate,
          hrotate,
          mrotate,
          srotate;

      if (!vm.formatChoose.format24)
        vm.aa = moment().format('A'); 
      else
        vm.aa = null; 
      
      // hours = ((hours > 12) ? hours - 12 : hours);
      if (minute === 0){
        minRotate = 0;
      }else{
        minRotate = minute*6;
      }
      if (seconds === 0){
        secRotate = 0;
      }else{
        secRotate = seconds*6;
      }
      if (hours === 12){
        hourRotate = 0;
      } else {
        hourRotate = (hours*30) + (minute/2);
      }

      hrotate = "rotate(" + hourRotate + "deg)";
      mrotate = "rotate(" + minRotate + "deg)";
      srotate = "rotate(" + secRotate + "deg)";

      vm.hours = {"-moz-transform": hrotate, "-webkit-transform" : hrotate};
      vm.mins = {"-moz-transform": mrotate, "-webkit-transform" : mrotate};
      vm.secs = {"-moz-transform": srotate, "-webkit-transform" : srotate};
    };

    var tickTickTock = function() {
      vm.clock = moment().format();
      setAnalogClock();
      if (vm.alarmsSets)
        checkMatch(moment().format('HH:mm'));
    };

    tickTickTock();
    $interval(tickTickTock, 1000);
  }

})();
