(function () {
    'use strict';
    angular.module('Tombola.Module.Ticket')
        .filter('SpaceFilter', [
            function () {

                return function(ticketNumber){
                  if (ticketNumber.ticketNumber === '00') {
                      return 'blankSpace';
                  }

                      if (ticketNumber.matched === true) {
                          return 'matched';
                      }
                          else {
                              return 'noMatch';
                          }
                };
            }]);
})();