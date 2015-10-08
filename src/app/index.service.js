(function() {
  'use strict';

  angular
    .module('tickTock')
    .service('GeneralClock', generalClock);

  function generalClock() {
    this.hora = 'hola';
  }

})();
