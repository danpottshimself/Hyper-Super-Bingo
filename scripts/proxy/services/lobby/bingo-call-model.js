(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCall', ['$timeout', 'UserLogIn', 'CheckWinners', 'BingoCallProxy', 'TicketCreation', 'ApiResponse',
            function ($timeout, userLogIn, checkForWinners, bingoCallProxy, ticketCreation, apiResponse) {
                var me = this,
                    noWinnerFound = true,
                    callNumber = 0;
                me.calledNumbers = [];

                me.bingoCall = function () {
                    callNumber += 1;
                    bingoCallProxy.bingoCall(callNumber)
                        .then(function (response) {
                            apiResponse.callDetails = response;
                            ticketCreation.ifNumbersMatch(apiResponse.callDetails.payload.call);
                            calledBingoBalls();
                            checkForWinners.checkForWinner(apiResponse.callDetails);
                            apiPolling();
                        });
                };

                var calledBingoBalls = function () {
                    if (me.calledNumbers.length >= 5) {
                        me.calledNumbers.shift();
                    }
                    me.calledNumbers.push(me.call);
                };

                var apiPolling = function () {
                    if (checkForWinners.houseWinner) {
                        $timeout.cancel(me.bingoCall);
                    }
                    if (noWinnerFound) {
                        $timeout(me.bingoCall, 4000);
                    }
                };
            }]);
})();