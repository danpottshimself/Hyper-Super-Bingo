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
            ticketCreation.ticket.should.equal[Array(3)];
            ticketCreation.restructuredTicket.numbers.should.equal[Array(15)];
        });

        afterEach(function () {
            sandbox.restore();
        })
    });
}());
