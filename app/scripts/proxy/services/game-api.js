(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameApi', ['$state', '$interval', 'AuthenticateUser', 'TicketCreation', 'UserLogIn', 'GameTimer', 'CheckWinners',
            function ($state, $interval, authenticateUser, ticketCreation, userLogIn, gameTimer) {
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

                me.logOut = function () {
                    var promise = authenticateUser.logOutInformation(userLogIn.token);
                    me.handlePromise(promise);
                    $state.go('logIn');
                };
                me.getNextGame = function () {
                    var promise = authenticateUser.nextGameInformation(userLogIn.token);
                    me.handlePromise(promise);
                    $state.go('tickets');
                };
                me.buyTicket = function () {
                    var promise = authenticateUser.buyTicketInformation(userLogIn.username, userLogIn.balance, userLogIn.token);
                    me.handlePromise(promise);
                };

            }]);
})();