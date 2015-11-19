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
                        me.lineMessage = 'Well Done! You have won the line prize of £' + response.winnerInfo.lineprize;
                        userLogIn.balance += response.winnerInfo.lineprize;
                    };

                    me.houseWinner= function(response){
                        me.houseMessage = 'Well Done! You have won the house prize of £'+ response.winnerInfo.houseprize;
                        userLogIn.balance += response.winnerInfo.houseprize;
                        $timeout ($state.go('lobby'), 6000);
                    };






                }]);
    })();