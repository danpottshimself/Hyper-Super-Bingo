(function () {
    'use strict';
    angular.module('Tombola.Module.Ticket')
        .service('TicketCreation',
        function () {
            var me = this,
                BingoNumber = function (theNumber) {
                    this.ticketNumber = theNumber;
                    this.matched = false;
                };
            me.ticketStrip = [];
            me.restructuredTicket = {numbers: []};
            me.squares = [];

            me.sortTicket = function (cardNumber) {
                me.ticket = [];
                var k;
                for (k = 0; k < cardNumber.length; k += 2) {
                    me.restructuredTicket.numbers.push(new BingoNumber(parseInt(cardNumber[k] + cardNumber[k + 1])));
                }
                var i,
                    j;
                for (i = 0; i < 3; i++) {
                    var line = [];

                    for (j = 0; j < 5; j++) {
                        line.push(me.restructuredTicket.numbers[j + (i * 5)]);
                    }
                    me.ticket.push(line);
                }
                me.ticketStrip.push(me.ticket);
            };

            me.createSquares = function () {
                return new Array(9);
            };

            me.isASquare = function (lineNumber, index) {
                var i;
                for (i = 0; i < me.ticket[lineNumber].length; i++) {
                    var minRange = (index * 10),
                        maxRange = (index * 10) + 10;
                    if (me.ticket[lineNumber][i].ticketNumber >= minRange && me.ticket[lineNumber][i].ticketNumber <= maxRange) {
                        return me.ticket[lineNumber][i];
                    }
                }
                return {ticketNumber: '00'};
            };

            me.ifNumbersMatch = function (calledNumber) {
                var i,
                    j;
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 5; j++) {
                        if (me.ticket[i][j].ticketNumber === calledNumber) {
                            me.ticket[i][j].matched = true;
                        }
                    }
                }
            };
        });
})();