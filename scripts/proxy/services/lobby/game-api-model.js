(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiModel',
        ['$state', 'GameApiProxy', 'TicketCreation', 'UserLogIn', 'GameTimer', 'CheckWinners', 'TokenService',
            function ($state, gameApiProxy, ticketCreation, userLogIn, gameTimer, checkWinners, tokenService) {
                var me = this;
                me.hideMe = false;
                me.handlePromise = function (promise) {
                    promise.then(function (response) {
                        if (response.message === "TicketBought") {
                            ticketCreation.sortTicket(response.card);
                        }
                        if (response.message === "NextGame") {
                            gameTimer.timeTillGame(response.start);
                        }
                        if (response.message == 'GetCall') {
                            checkWinners.checkForWinner(response);
                        }
                        return response;
                    })
                        .catch(function (response) {
                            console.log(response);
                        });
                };

                me.getNextGame = function () {
                    var promise = gameApiProxy.nextGameInformation(tokenService.getToken);
                    me.handlePromise(promise);
                    $state.go('tickets');
                };
                me.buyTicket = function () {
                    var promise = gameApiProxy.buyTicketInformation(userLogIn.username, userLogIn.balance, tokenService.getToken);
                    me.handlePromise(promise);
                };

            }]);
})();