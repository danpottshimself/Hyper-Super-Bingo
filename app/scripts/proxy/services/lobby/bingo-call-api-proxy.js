(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCallApiProxy', ['LogInServerApiProxy',
            function (logInServerApiProxy) {
                var me  = this;
                me.calledNumbers = [];

                me.bingoCallInformation = function (username, balance, callNumber, token ) {
                    var data = {
                        "gameId": 1,
                        "userId": username,
                        "balance": balance,
                        "callnumber": callNumber
                    };
                    return logInServerApiProxy.dataHandler('/game/getcall', data, token, 'POST');
                };

            }]);
})();