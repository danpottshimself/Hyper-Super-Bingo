(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCallProxy', ['Proxy','UserLogIn',
            function (proxy, userLogIn) {
                var me  = this;
                me.calledNumbers = [];

                me.bingoCall = function (callNumber, token) {
                    var data = {
                        gameId: 1,
                        userId: userLogIn.username,
                        balance: userLogIn.balance,
                        callnumber: callNumber
                    };
                    return proxy.callApi('/game/getcall', data, token,  'POST');
                };

            }]);
})();