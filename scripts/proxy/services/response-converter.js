(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .factory('ObjectConverter',
        function () {
            var me = this;
            me.responseConverter = function (response, endUrl) {
                if (endUrl == '/users/login') {
                    return logInDataConverter(response);
                }
                else if (endUrl == '/game/next') {
                    return nextGameDataConverter(response);
                }
                else if (endUrl == '/game/getcall') {
                    return getCallDataConverter(response);
                }
                else if (endUrl == '/game/buyticket') {
                    return buyTicketDataConverter(response);
                }
            };

            var logInDataConverter = function (response) {
                    var logInDetails = {
                        username: response.payload.user.username,
                        balance: response.payload.user.balance,
                        token: response.payload.user.token
                    };
                    return logInDetails;
                },

                nextGameDataConverter = function (response) {
                    var nextGameDetails = {
                        message: response.message,
                        start: response.payload.user.username
                    };
                    return nextGameDetails;
                },

                getCallDataConverter = function (response) {
                    var getCallDetails = {
                        message: response.message,
                        call: response.payload.call,
                        winnerInfo: null
                    };
                    if (response.message === 'Line' || response.message === 'Winner') {
                        getCallDetails.winnerInfo = response.message;
                    }
                    return getCallDetails;
                },

                buyTicketDataConverter = function (response) {
                    var buyTicketDetails = {
                        message: response.message,
                        card: response.payload.card
                    };
                    return buyTicketDetails;
                };
        });
})();