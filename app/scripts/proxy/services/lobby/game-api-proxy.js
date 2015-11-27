(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiProxy', [ '$http', '$q', 'Proxy','UserLogIn',
            function ($http, $q, proxy, userLogIn) {
                var me = this;

                me.nextGame = function (token) {
                    return proxy.callApi('/game/next', {}, token, 'GET');
                };

                me.buyTicket = function (token) {
                    var data = {
                        'gameId' : 1,
                        'userId': userLogIn.username,
                        'balance':userLogIn.balance
                        };
                    return proxy.callApi('/game/buyticket', data, token, 'POST');
                };
            }]);
})();