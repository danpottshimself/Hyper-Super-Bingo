(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCallProxy', ['LogInServerApiProxy','ApiResponse',
            function (logInServerApiProxy, apiResponse) {
                var me  = this;
                me.calledNumbers = [];

                me.bingoCall = function (callNumber) {
                    var data = {
                        gameId: 1,
                        userId: apiResponse.userDetails.username,
                        balance: apiResponse.userDetails.balance,
                        callnumber: callNumber
                    };
                    return logInServerApiProxy.dataHandler('/game/getcall', data,  'POST');
                };

            }]);
})();