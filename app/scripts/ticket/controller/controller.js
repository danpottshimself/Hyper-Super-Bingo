(function () {
    'use strict';
    angular.module('Tombola.Module.Ticket')
        .controller('BingoTicket', ['$scope','TicketCreation','CheckWinners',
            function ($scope, ticketCreation, checkWinners) {
                $scope.ticketCreation = ticketCreation;
                $scope.checkWinners = checkWinners;

                }]);
})();