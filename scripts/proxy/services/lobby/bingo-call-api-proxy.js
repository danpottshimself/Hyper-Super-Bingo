(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCallProxy', ['LogInServerApiProxy','UserLogIn',
            function (logInServerApiProxy, userLogIn) {
                var me  = this;
                me.calledNumbers = [];

                me.bingoCall = function (callNumber, token) {
                    var data = {
                        gameId: 1,
                        userId: userLogIn.username,
                        balance: userLogIn.balance,
                        callnumber: callNumber
                    };
                    return logInServerApiProxy.dataHandler('/game/getcall', data, token,  'POST');
                };

            }]);
})();