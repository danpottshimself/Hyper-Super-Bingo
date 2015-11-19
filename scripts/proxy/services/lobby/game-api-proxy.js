(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiProxy', [ '$http', '$q', 'LogInServerApiProxy','ApiResponse',
            function ($http, $q, logInServerApiProxy, apiResponse) {
                var me = this;

                me.nextGameInformation = function (token) {
                    return logInServerApiProxy.dataHandler('/game/next', {}, token, 'GET');
                };

                me.buyTicketInformation = function (token) {
                    var data = {
                        'gameId' : 1,
                        'userId': apiResponse.userDetails.username,
                        'balance':apiResponse.userDetails.balance
                        };
                    return logInServerApiProxy.dataHandler('/game/buyticket', data, token, 'POST');
                };
            }]);
})();