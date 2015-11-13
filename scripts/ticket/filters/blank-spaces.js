(function () {
    'use strict';
    angular.module('Tombola.Module.Ticket')
        .filter('SpaceFilter', [
            function () {

                return function(ticketNumber){
                  if (ticketNumber.number === '00') {
                      return 'blankSpace';
                  }
                    console.log(ticketNumber);
                      if (ticketNumber.matched === true) {
                          return 'matched';
                      }
                          else {
                              return 'noMatch';
                          }
                };
            }]);
})();