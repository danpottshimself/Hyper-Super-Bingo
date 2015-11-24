(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApiModel',
        ['$state', 'GameApiProxy', 'TicketCreation', 'UserLogIn', 'GameTimer', 'TokenService',
            function ($state, gameApiProxy, ticketCreation, userLogIn, gameTimer, tokenService) {
                var me = this,
                    stateChanger = function () {
                        $state.go('tickets');
                    };

                me.handlePromise = function (promise) {
                    promise.then(function (response) {
                        if (response.message === "TicketBought") {
                            ticketCreation.sortTicket(response.card);
                        }
                        if (response.message === "NextGame") {
                            gameTimer.timeTillGame(response.start);
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
                    stateChanger();
                };
                me.buyTicket = function () {
                    var promise = gameApiProxy.buyTicketInformation(tokenService.getToken);
                    me.handlePromise(promise);
                };
            }]);
})();