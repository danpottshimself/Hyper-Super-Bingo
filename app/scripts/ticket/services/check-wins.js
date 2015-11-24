(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .service('CheckWinners', ['$state', '$timeout', 'UserLogIn','TicketCreation',
                function ($state, $timeout, userLogIn, ticketCreation) {
                    var me  = this,
                        stateChanger = function (){
                            $state.go('lobby');
                        };

                    me.checkForWinner = function (response) {
                        if (response.message === "Line") {
                            me.lineWinner(response);
                        }
                        if (response.message === 'Winner') {
                            me.houseWinner(response);
                        }
                    };

                    me.lineWinner= function(response){
                        me.lineMessage = 'Well Done! You have won the line prize of £' + response.winnerInfo.lineprize;
                        userLogIn.balance += response.winnerInfo.lineprize;
                    };

                    me.houseWinner= function(response){
                        me.houseMessage = 'Well Done! You have won the house prize of £'+ response.winnerInfo.houseprize;
                        userLogIn.balance += response.winnerInfo.houseprize;
                        $timeout (clearPreviousGame, 6000);
                        $timeout (stateChanger, 9000);
                    };

                    var clearPreviousGame = function(){
                            ticketCreation.ticketStrip = [];
                            ticketCreation.restructuredTicket = {numbers: []};
                            ticketCreation.squares = [];
                            ticketCreation.ticket = [];
                            me.lineMessage = null;
                            me.houseMessage = null;
                    };
                }]);
    })();