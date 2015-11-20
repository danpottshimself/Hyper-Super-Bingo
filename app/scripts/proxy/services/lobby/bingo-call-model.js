(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCall', ['$timeout', 'LogInServerApiProxy', 'UserLogIn','CheckWinners','BingoCallApiProxy', 'TicketCreation',
            function ($timeout, logInServerApiProxy, userLogIn, checkForWinners, bingoCallApiProxy, ticketCreation) {
                var me  = this,
                    noWinnerFound = true,
                    callNumber = 0;
                    me.calledNumbers = [];

                me.bingoCall = function () {
                    callNumber +=1;
                    bingoCallApiProxy.bingoCallInformation(userLogIn.username, userLogIn.balance, callNumber, userLogIn.token)
                        .then(function (response){
                    me.balance = response.payload.user.balance/100;
                    me.call = response.payload.call;

                    ticketCreation.ifNumbersMatch(me.call);
                    calledBingoBalls();
                    checkForWinners.checkForWinner(response);
                    longPolling();
                        });
                };

                var calledBingoBalls = function (){
                    if(me.calledNumbers.length >= 5){
                        me.calledNumbers.shift();
                    }
                    me.calledNumbers.push(me.call);
                };

                var longPolling = function (){
                    if(checkForWinners.houseWinner){
                        $timeout.cancel(me.bingoCall);
                    }
                    if (noWinnerFound){
                        $timeout(me.bingoCall, 4000);
                    }
                };
            }]);
})();