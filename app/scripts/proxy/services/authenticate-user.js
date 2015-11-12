(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('AuthenticateUser', [ '$http', '$q', 'DataHandle',
            function ($http, $q, dataHandle) {
                var me = this;

                me.logOutInformation = function (token) {
                    var headers = {
                        'x-token': token,
                        'content-type': 'application/json'
                    };
                    return dataHandle.dataHandler('/users/logout', {}, headers, 'POST');
                };

                me.nextGameInformation = function (token) {
                    var headers = {
                        'x-token': token,
                        'content-type': 'application/json'
                    };
                    return dataHandle.dataHandler('/game/next', {}, headers, 'GET');
                };
                me.buyTicketInformation = function (username, balance, token) {
                    var data = {
                        'gameId' : 1,
                        'userId': username,
                        'balance':balance
                        },
                        headers = {
                        'x-token': token,
                        'content-type': 'application/json'
                        };
                    return dataHandle.dataHandler('/game/buyticket', data, headers, 'POST');
                };
            }]);
})();