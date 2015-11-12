(function () {
    'use strict';
    angular.module('Tombola.Module.Ticket')
        .filter('OverLay', [
            function () {

                return function(lineMessage, houseMessage){
                    if (lineMessage === 'Well Done! You have won the line prize of £1') {
                        return 'modal';
                    }
                    if (houseMessage === 'Well Done! You have won the line prize of £5') {
                        return 'modal';
                    }
                    else {
                        return '';
                    }
                };
            }]);
})();