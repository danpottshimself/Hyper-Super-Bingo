(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiProxy', [ '$http', '$q', 'LogInServerApiProxy','ApiResponse',
            function ($http, $q, logInServerApiProxy, apiResponse) {
                var me = this;

                me.nextGameInformation = function () {
                    return logInServerApiProxy.dataHandler('/game/next', {}, 'GET');
                };

                me.buyTicketInformation = function () {
                    var data = {
                        'gameId' : 1,
                        'userId': apiResponse.userDetails.username,
                        'balance':apiResponse.userDetails.balance
                        };
                    return logInServerApiProxy.dataHandler('/game/buyticket', data, 'POST');
                };
            }]);
})();