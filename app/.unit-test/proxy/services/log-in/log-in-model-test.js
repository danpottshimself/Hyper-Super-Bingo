(function () {
    'use strict';
    describe('Test LogInProxy', function () {
        var sandbox,
            q,
            rootScope,
            setTokenSpy,
            stateChanger,
            resetTokenSpy,
            userLogIn;

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Module.ApiCall', function ($provide) {
                $provide.value('TokenService', mocks.tokenService);
                $provide.value('Proxy', mocks.logInProxy);
                $provide.value('$state', mocks.stateChange);
            });

            inject(['$q', '$rootScope', 'UserLogIn',
                function ($q, $rootScope, UserLogIn) {
                    q = $q;
                    rootScope = $rootScope.$new();
                    userLogIn = UserLogIn;
                }]);

            sandbox = sinon.sandbox.create();
            setTokenSpy = sinon.sandbox.spy(mocks.tokenService, 'setToken');
            resetTokenSpy = sinon.sandbox.spy(mocks.tokenService, 'resetToken');
            stateChanger = sinon.sandbox.spy(mocks.stateChange, 'go');
        });


        it('Ensures the post log in is working and returns values', function () {
            var deferred = q.defer(),
                response = {
                    username: 'drwho',
                    balance: 107,
                    token: '112123223'
                },
            logInProxyStub = sinon.sandbox.stub(mocks.logInProxy, 'logIn', function () {
                return deferred.promise;
            });

            userLogIn.logIn();
            deferred.resolve(response);
            rootScope.$digest();
            logInProxyStub.should.have.been.calledOnce;
            stateChanger.should.have.been.calledOnce;
            setTokenSpy.should.have.been.calledOnce;

        });

        it('Checks that functions are called after the if statements and promise for the log out function.', function () {
            var deferred = q.defer(),
                expectedReturn = {message: 'LogOut successful'},
                logOutStub = sinon.sandbox.stub(mocks.logInProxy, 'logOut', function () {
                    return deferred.promise;
                });

            userLogIn.logOut();
            deferred.resolve(expectedReturn);
            rootScope.$apply();
            logOutStub.should.have.been.calledOnce;
            stateChanger.should.have.been.calledOnce;
            resetTokenSpy.should.have.been.calledOnce;
        });

        afterEach(function () {
            sandbox.restore();
        })
    });
}());

