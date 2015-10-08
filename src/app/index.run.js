(function() {
  'use strict';

  angular
    .module('tickTock')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
