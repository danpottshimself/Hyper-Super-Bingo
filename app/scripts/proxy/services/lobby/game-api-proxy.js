(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiProxy', [ '$http', '$q', 'LogInServerApiProxy',
            function ($http, $q, logInServerApiProxy) {
                var me = this;

                me.nextGameInformation = function (token) {
                    return logInServerApiProxy.dataHandler('/game/next', {}, token, 'GET');
                };

                me.buyTicketInformation = function (username, balance, token) {
                    var data = {
                        'gameId' : 1,
                        'userId': username,
                        'balance':balance
                        };
                    return logInServerApiProxy.dataHandler('/game/buyticket', data, token, 'POST');
                };
            }]);
})();