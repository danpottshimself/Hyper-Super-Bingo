(function () {
    'use strict';
    describe('Test ProxyController', function () {
        var controller,
            sandbox,
            authenticateUser,
            gameApi,
            userLogIn,
            callingMethod,
            gameTimer,
            $controller,
            scope;

        beforeEach(function () {
            module('Tombola.Module.ApiCall',function ($provide) {
                $provide.value('AuthenticateUser', mocks.authenticateUser);
                $provide.value('GameApi', mocks.gameApi);
                $provide.value('UserLogIn', mocks.userLogIn);
                $provide.value('BingoCall', mocks.callingMethod);
                $provide.value('GameTimer', mocks.gameTimer);
            });

            inject(function (_$controller_, $rootScope) {
                scope = $rootScope.$new();
                $controller = _$controller_;
                controller = $controller('ApiController', {
                    $scope: scope
                });
            });

            sandbox = sinon.sandbox.create();
            authenticateUser = sinon.sandbox.mock(mocks.authenticateUser);
            gameApi = sinon.sandbox.mock(mocks.gameApi);
            userLogIn = sinon.sandbox.mock(mocks.userLogIn);
            callingMethod = sinon.sandbox.mock(mocks.callingMethod);
            gameTimer = sinon.sandbox.mock(mocks.gameTimer);
            controller.authenticateUser = mocks.authenticateUser;
            controller.gameApi = mocks.gameApi;
            controller.userLogIn = mocks.userLogIn;
            controller.callingMethod = mocks.callingMethod;
            controller.gameTimer = mocks.gameTimer;

        });

        it('Ensures that the authenticateUser service is used in the scope correctly', function () {
            controller.authenticateUser.should.equal(mocks.authenticateUser);
        });
        it('Ensures that the gameApi service is used in the scope correctly', function () {
            controller.gameApi.should.equal(mocks.gameApi);
        });
        it('Ensures that the gameModel service is used in the scope correctly', function () {
            controller.userLogIn.should.equal(mocks.userLogIn);
        });
        it('Ensures that the gameModel service is used in the scope correctly', function () {
            controller.callingMethod.should.equal(mocks.callingMethod);
        });
        it('Ensures that the gameModel service is used in the scope correctly', function () {
            controller.gameTimer.should.equal(mocks.gameTimer);
        });

        afterEach(function(){
            sandbox.restore();
        })
    });
})();