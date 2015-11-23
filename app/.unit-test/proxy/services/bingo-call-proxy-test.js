(function () {
    'use strict';
    describe('Test BingoCallProxy', function () {
        var sandbox,
            $q,
            $httpBackend,
            bingoCallProxy,
            proxySpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('LogInServerApiProxy', mocks.logInProxy);
                $provide.value('UserLogIn', mocks.userLogIn);
            });

            inject(function($injector){
                $q = $injector.get('$q');
                $httpBackend = $injector.get('$httpBackend');
                bingoCallProxy = $injector.get('BingoCallProxy');
            });
            sandbox = sinon.sandbox.create();
            proxySpy = sinon.sandbox.spy(mocks.logInProxy, 'callApi');

        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            bingoCallProxy.bingoCall();
            proxySpy.should.have.been.calledOnce;
        });

        afterEach(function(){
            sandbox.restore();
            proxySpy.restore();
        })
    });
}());
