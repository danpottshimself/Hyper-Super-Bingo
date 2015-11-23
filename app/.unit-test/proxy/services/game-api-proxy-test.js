(function () {
    'use strict';
    describe('Test GameApiProxy', function () {
        var sandbox,
            $q,
            $httpBackend,
            logInProxy,
            gameApiProxy,
            dataHandlerSpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('LogInServerApiProxy', mocks.logInProxy);
                $provide.value('TokenService', mocks.tokenService);
            });

            inject(function($injector){
                $q = $injector.get('$q');
                $httpBackend = $injector.get('$httpBackend');
                gameApiProxy = $injector.get('GameApiProxy');

            });
            sandbox = sinon.sandbox.create();
            logInProxy = sinon.sandbox.mock(mocks.logInProxy);
            dataHandlerSpy = sinon.sandbox.spy(mocks.logInProxy, 'callApi');

        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            gameApiProxy.nextGameInformation();
            dataHandlerSpy.should.have.been.calledOnce;
        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            gameApiProxy.buyTicketInformation();
            dataHandlerSpy.should.have.been.calledOnce;
        });


        afterEach(function(){
            sandbox.restore();
            dataHandlerSpy.restore();
        })
    });
}());
