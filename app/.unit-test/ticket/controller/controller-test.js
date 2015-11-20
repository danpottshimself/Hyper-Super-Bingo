(function () {
    'use strict';
    describe('Test TicketController', function () {
        var controller,
            sandbox,
            ticketCreation,
            checkWinners,
            $controller,
            scope;

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Module.ApiCall',function ($provide) {
                $provide.value('TicketCreation', mocks.ticketCreation);
                $provide.value('CheckWinners', mocks.checkWinners);

            });

            inject(function (_$controller_, $rootScope) {
                scope = $rootScope.$new();
                $controller = _$controller_;
                controller = $controller('ApiController', {
                    $scope: scope
                });
            });

            sandbox = sinon.sandbox.create();
            ticketCreation = sinon.sandbox.mock(mocks.ticketCreation);
            checkWinners = sinon.sandbox.mock(mocks.checkWinners);
            controller.checkWinners = mocks.checkWinners;
            controller.ticketCreation = mocks.ticketCreation;

        });

        it('Ensures that the authenticateUser service is used in the scope correctly', function () {
            controller.checkWinners.should.equal(mocks.checkWinners);
        });
        it('Ensures that the gameApi service is used in the scope correctly', function () {
            controller.ticketCreation.should.equal(mocks.ticketCreation);
        });

        afterEach(function(){
            sandbox.restore();
        })
    });
})();