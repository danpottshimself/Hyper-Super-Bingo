(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .service('CheckWinners', ['$state', '$timeout', 'UserLogIn',
                function ($state, $timeout, userLogIn) {
                    var me  = this;

                    me.checkForWinner = function (response) {
                        if (response.message === "Line") {
                            me.lineWinner(response);
                        }
                        if (response.message === 'Winner') {
                            me.houseWinner(response);
                        }
                    };

                    me.lineWinner= function(response){
                        me.lineMessage = 'Well Done! You have won the line prize of £' + response.payload.winnerInfo.lineprize;
                        userLogIn.balance += response.payload.winnerInfo.lineprize;
                    };

                    me.houseWinner= function(response){
                        me.houseMessage = 'Well Done! You have won the house prize of £'+ response.payload.winnerInfo.houseprize;
                        userLogIn.balance += response.payload.winnerInfo.houseprize;
                        $timeout ($state.go('lobby'), 6000);
                    };






                }]);
    })();