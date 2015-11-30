(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .run(['$templateCache', function ($templateCache) {
                $templateCache.put('html/login.html', ''+
                    '<div ng-controller="ApiController">' +
                        '<div class="login">' +
                            '<h1>Log in to play Bingo</h1>' +
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
                    ' <div>' +
                        '<h2> Rules of the game</h2>' +
                        '<ul class="rulesList">'+
                            '<li> Once the game has begun, numbers will be shown on screen, if these numbers match the numbers on your ticket, you are one step closer to winning.</li>'+
                            '<li>Match 5 numbers on an individual line on the bingo ticket to win the line prize</li>'+
                            '<li>Match all of the numbers on the ticket before anyone else and you will win the house prize</li>'+
                        '</ul>'+
                        '<br>'+
                        '<div class="lobbyPadding">Once you click on the "Play Game" button, you will be taken to the next available game of bingo.'+
                        'While you are waiting for the game to start, you can purchase bingo tickets.'+
                        'The more tickets you purchase, the better the chances of winning.</div>'+
                    '</div>'+
                    '<br>'+
                    '<div class="button together"> ' +
                        '<input type="button" value="Play Game" ng-click="gameApi.getNextGame()">' +
                    ' </div> ' +
                    '<div class="button together">'+
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
                        '<h2 class="{{checkWinners.lineMessage | OverLay}}"> {{checkWinners.lineMessage}}</h2>' +
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
                    '</div>' +
                    '<br>'+
                    '<a class = "button" ui-sref="lobby" href="#">Home</a>'
                    );
                     }]);
        })();