(function () {
    'use strict';
    describe('Test BingoCallProxy', function () {
        var sandbox,
            $q,
            $httpBackend,
            logInProxy,
            bingoCallProxy,
            dataHandlerSpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('LogInServerApiProxy', mocks.logInProxy);
            });

            inject(function($injector){
                $q = $injector.get('$q');
                $httpBackend = $injector.get('$httpBackend');
                bingoCallProxy = $injector.get('BingoCallApiProxy');

            });
            sandbox = sinon.sandbox.create();
            logInProxy = sinon.sandbox.mock(mocks.logInProxy);
            dataHandlerSpy = sinon.sandbox.spy(mocks.logInProxy, 'dataHandler');

        });

        it('Checks that the timer starts when the user buys a ticket', function(){
            bingoCallProxy.bingoCallInformation();
            dataHandlerSpy.should.have.been.calledOnce;
        });

        afterEach(function(){
            sandbox.restore();
        })
    });
}());
