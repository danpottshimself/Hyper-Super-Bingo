(function () {
    'use strict';
    describe('Test LogInProxy', function () {
        var sandbox,
            $state,
            $q,
            rootScope,
            tokenServiceSpy,
            userLogIn;

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Module.ApiCall', function ($provide) {
                $provide.value('TokenService', mocks.tokenService);
                $provide.value('LogInServerProxy', mocks.logInProxy);
            });

            inject(['$q', '$state', '$rootScope', 'UserLogIn',
                function (q, state, $rootScope, UserLogIn) {
                    $q = q;
                    rootScope = $rootScope;
                    userLogIn = UserLogIn;
                    $state = state;
                }]);

            sandbox = sinon.sandbox.create();
            tokenServiceSpy = sinon.sandbox.spy(mocks.tokenService, 'setToken');
        });


        it('Ensures the post log in is working and returns values', function () {
            var deferred = $q.defer(),
                //response = {
                //    username: 'drwho',
                //    balance: 107,
                //    token: '112123223'
                //},
                logInProxyStub = sinon.sandbox.stub(mocks.logInProxy, 'logIn', function (){
                    return deferred.promise;
                });

            //logInProxyStub.returns(deferred.promise);
            userLogIn.logIn();
            //deferred.resolve(response);
            logInProxyStub.should.have.been.calledOnce;

        });

        afterEach(function () {
            sandbox.restore();
        })
    });
}());

