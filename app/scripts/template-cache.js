(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .run(['$templateCache', function ($templateCache) {
                $templateCache.put('html/login.html', ''+
                    '<div ng-controller="ApiController">' +
                        '<div class="login">' +
                            '<h1>Login to Bingo</h1>' +
                            '<form>' +
                                ' <p>' +
                                    '<input type="text" ng-model="userLogIn.username" name="username" value="" placeholder="Username or Email">' +
                                '</p>' +
                                ' <p>' +
                                    '<input type="password" ng-model="userLogIn.password" name="password" value="" placeholder="Password">' +
                                '</p> ' +
                                '<p class="remember_me">' +
                                    '<label>' +
                                    '<input type="checkbox" name="remember_me" id="remember_me">' +
                                    'Remember me on this computer' +
                                    '</label>' +
                                '</p>' +
                                '<input type="button" value="Submit" ng-click="userLogIn.logIn()">' +
                            '</form> ' +
                        '</div>' +
                    '</div>' );
                $templateCache.put('html/lobby.html', '' +
                    '<div ng-controller="ApiController" class="centreLobby"> ' +
                    '<h1> Welcome! Lets play some bingo</h1>' +
                    ' <div class="playerInformation">' +
                    ' <div>Username: {{userLogIn.username}}</div>' +
                    ' <div>Balance:{{userLogIn.balance | currency}}</div>' +
                    ' </div> ' +
                    '<div class="button"> ' +
                    '<input type="button" value="Start new game" ng-click="gameApi.getNextGame()">' +
                    ' </div> ' +
                    '<div class="button">'+
                    '<input type="button" value="Log Out" ng-click="userLogIn.logOut()"> ' +
                    '</div>'+
                    '<br> ' +
                    '</div>' +
                    '<br>' +
                    '<a class = "button" ui-sref="logIn" href="#">Home</a>');

                $templateCache.put('ticketMaster', '' +
                    '<div ng-controller="ApiController">'+
                        '<h2> Balance: {{userLogIn.balance | currency}} </h2>' +
                    '<h1 class="calledRow numbersRow animated pulse infinite">{{callingMethod.calledNumbers[0]}}</h1>'+
                    '<h1 class="calledRow numbersRow">{{callingMethod.calledNumbers[1]}}</h1>'+
                    '<h1 class="calledRow numbersRow">{{callingMethod.calledNumbers[2]}}</h1>'+
                    '<h1 class="calledRow numbersRow">{{callingMethod.calledNumbers[3]}}</h1>'+
                    '<h1 class="calledRow numbersRow">{{callingMethod.calledNumbers[4]}}</h1>'+
                    '<h1 class="calledNumber animated slideInLeft infinite">{{callingMethod.call}}</h1>'+
                    '</div>' +
                    '<div ng-controller="BingoTicket">' +
                        '<h2 class="{{checkWinners.lineMessage | OverLay}}"> {{checkWinners.lineMessage}} {{class}}</h2>' +
                        '<h2 class="{{checkWinners.lineMessage | OverLay}}"> {{checkWinners.houseMessage}}</h2>' +
                    '</div>'+
                    '<div ng-hide="gameTimer.hideMe" ng-controller="ApiController">'   +
                        '<h2> Now youre ready to see some balls!</h2>' +
                        '<h3> {Jeeves is now preparing the balls} Get ready for some bingo blastin!</h3>' +
                        '<h2>{{gameTimer.timeBeforeStart}} </h2>' +
                        ' <input type="button" value="Buy ticket" ng-click="gameApi.buyTicket()">' +
                    ' </div>' +
                    '<div ng-controller="BingoTicket" class="bingoTicket">'+
                    '<div ng-repeat="ticket in ticketCreation.ticketStrip  track by $index" class="ticketSpace">'+
                    '<div ng-repeat="line in ticket  track by $index">'+
                    '<div ng-repeat= "square in ticketCreation.createSquares() track by $index">' +
                    '<div class="square border centreText {{ticketCreation.isASquare($parent.$index, $index)| SpaceFilter}}"> {{ticketCreation.isASquare($parent.$index, $index).ticketNumber}}' +
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                );
                     }]);
        })();