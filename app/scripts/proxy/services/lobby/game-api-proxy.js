(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiProxy', [ '$http', '$q', 'LogInServerApiProxy','UserLogIn',
            function ($http, $q, logInServerApiProxy, userLogIn) {
                var me = this;

                me.nextGameInformation = function (token) {
                    return logInServerApiProxy.dataHandler('/game/next', {}, token, 'GET');
                };

                me.buyTicketInformation = function (token) {
                    var data = {
                        'gameId' : 1,
                        'userId': userLogIn.username,
                        'balance':userLogIn.balance
                        };
                    return logInServerApiProxy.dataHandler('/game/buyticket', data, token, 'POST');
                };
            }]);
})();