(function () {
    'use strict';
    describe('Test BingoCallProxy', function () {
        var sandbox,
            bingoCallProxy,
            callApiSpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('Proxy', mocks.logInProxy);
                $provide.value('UserLogIn', mocks.userLogIn);
            });

            inject(function($injector){
                bingoCallProxy = $injector.get('BingoCallProxy');

            });
            sandbox = sinon.sandbox.create();
            callApiSpy = sinon.sandbox.spy(mocks.logInProxy, 'callApi');

        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            bingoCallProxy.bingoCall();
            callApiSpy.should.have.been.calledOnce;
        });

        afterEach(function(){
            sandbox.restore();
        })
    });
}());
