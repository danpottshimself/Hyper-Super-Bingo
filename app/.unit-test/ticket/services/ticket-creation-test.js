(function () {
    'use strict';
    describe('Test EndOfGame', function () {
        var sandbox,
            ticketCreation;

        beforeEach(function () {
            module('Tombola.Module.Ticket', function ($provide) {
                $provide.value('BingoCall', mocks.callingMethod);
            });

            inject(['TicketCreation', function (_ticketCreation_) {
                ticketCreation = _ticketCreation_;
            }]);

            sandbox = sinon.sandbox.create();
        });

        it('Checks that the timer starts when the user buys a ticket', function () {
            ticketCreation.sortTicket('010203040506070809101112131415');
            ticketCreation.lines.should.equal[Array(3)];
            ticketCreation.ticket.numbers.should.equal[Array(15)];
        });

        it('Checks that the timer starts when the user buys a ticket', function () {
            //ticketCreation.ticket = [{}];
            ticketCreation.ticket[0][0].ticketNumber = 27;
            ticketCreation.ifNumbersMatch(27);
            ticketCreation.ticket[0][0].matched.should.equal(true);
        });


        afterEach(function () {
            sandbox.restore();
        })
    });
}());
