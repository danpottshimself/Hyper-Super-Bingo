(function () {
    'use strict';
    describe('Test GameApiProxy', function () {
        var sandbox,
            gameApiProxy,
            callApiSpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('Proxy', mocks.logInProxy);
                $provide.value('TokenService', mocks.tokenService);
            });

            inject(function($injector){
                gameApiProxy = $injector.get('GameApiProxy');
            });
            sandbox = sinon.sandbox.create();
            callApiSpy = sinon.sandbox.spy(mocks.logInProxy, 'callApi');
        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            gameApiProxy.nextGame();
            callApiSpy.should.have.been.calledOnce;
        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            gameApiProxy.buyTicket();
            callApiSpy.should.have.been.calledOnce;
        });

        afterEach(function(){
            sandbox.restore();
        })
    });
}());
