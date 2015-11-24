(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCall',
        ['$timeout', 'UserLogIn', 'CheckWinners', 'BingoCallProxy', 'TicketCreation', 'TokenService',
            function ($timeout, userLogIn, checkForWinners, bingoCallProxy, ticketCreation, tokenService) {
                var me = this,
                    noWinnerFound = true,
                    callNumber = 0;
                me.calledNumbers = [];

                me.bingoCall = function () {
                    callNumber += 1;
                    if (callNumber === 90) {
                        callNumber = 0;
                        me.calledNumbers = [];
                    }
                    bingoCallProxy.bingoCall(callNumber, tokenService.getToken())
                        .then(function (response) {
                            ticketCreation.ifNumbersMatch(response.call);
                            calledBingoBalls(response.call);
                            checkForWinners.checkForWinner(response);
                            apiPolling();
                        });
                };

                var calledBingoBalls = function (lastCalledNumber) {
                    if (me.calledNumbers.length >= 5) {
                        me.calledNumbers.shift();
                    }
                    me.calledNumbers.push(lastCalledNumber);
                };

                var apiPolling = function () {
                    if (checkForWinners.houseWinner) {
                        $timeout.cancel(me.bingoCall);
                    }
                    if (noWinnerFound) {
                        $timeout(me.bingoCall, 500);
                    }
                };
            }]);
})();