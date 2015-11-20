(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiModel', ['$state', 'GameApiProxy', 'TicketCreation', 'UserLogIn', 'GameTimer', 'CheckWinners',
            function ($state, gameApiProxy, ticketCreation, userLogIn, gameTimer, checkWinners) {
                var me  = this;
                me.hideMe = false;
                me.handlePromise = function (promise) {
                    promise.then(function (response) {
                        if(response.message === "TicketBought"){
                            ticketCreation.sortTicket(response.payload.card);
                        }
                        if(response.message === "NextGame"){
                            gameTimer.timeTillGame(response.payload.start);
                        }
                        if(response.message == 'GetCall'){
                            checkWinners.checkForWinner(response);
                        }
                        return response;
                    })
                        .catch(function (response) {
                            console.log(response);
                        });
                };

                me.getNextGame = function () {
                    var promise = gameApiProxy.nextGameInformation(userLogIn.token);
                    me.handlePromise(promise);
                    $state.go('tickets');
                };
                me.buyTicket = function () {
                    var promise = gameApiProxy.buyTicketInformation(userLogIn.username, userLogIn.balance, userLogIn.token);
                    me.handlePromise(promise);
                };

            }]);
})();