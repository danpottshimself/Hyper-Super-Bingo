(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('BingoCall', ['$timeout', 'AuthenticateUser', 'DataHandle', 'UserLogIn','CheckWinners','TicketCreation',
            function ($timeout, authenticateUser, dataHandle, userLogIn, checkForWinners, ticketCreation) {
                var me  = this,
                    noWinnerFound = true,
                    callNumber = 0;
                    me.calledNumbers = [];

                me.bingoCall = function () {
                    callNumber +=1;
                    var promise = me.bingoCallInformation(userLogIn.username, userLogIn.balance, callNumber, userLogIn.token);
                    me.handlePromise(promise);
                    if(checkForWinners.houseWinner){
                        $timeout.cancel(me.bingoCall);
                    }
                    if (noWinnerFound){
                        $timeout(me.bingoCall, 4000);
                    }

                };

                me.bingoCallInformation = function (username, balance, callNumber, token ) {
                    var data = {
                            "gameId": 1,
                            "userId": username,
                            "balance": balance,
                            "callnumber": callNumber
                        },
                        headers = {
                            "x-token": token,
                            'content-type': 'application/json'
                        };
                    return dataHandle.dataHandler('/game/getcall', data, headers, 'POST');
                };


                me.handlePromise = function (promise) {
                    promise.then(function (response) {
                        me.balance = response.payload.user.balance/100;
                        me.call = response.payload.call;
                        ticketCreation.ifNumbersMatch(me.call);
                        if(me.calledNumbers.length >= 5){
                            me.calledNumbers.shift();
                        }
                        me.calledNumbers.push(me.call);
                        checkForWinners.checkForWinner(response);
                        return response;
                    })
                        .catch(function (response) {
                            console.log(response);
                        });
                };

            }]);
})();