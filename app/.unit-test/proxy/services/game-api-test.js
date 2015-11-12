(function () {
    'use strict';
    describe('Test gameApi', function () {
        var stateChangeSpy,
            timeout,
            sandbox,
            authenticateUser,
            ticketCreation,
            userLogIn,
            checkWinners,
            handlePromiseSpy,
            gameTimer,
            $q,
            $rootScope,
            gameApi;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('$state', mocks.stateChange);
                $provide.value('AuthenticateUser', mocks.authenticateUser);
                $provide.value('TicketCreation', mocks.ticketCreation);
                $provide.value('UserLogIn', mocks.userLogIn);
                $provide.value('CheckWinners', mocks.checkWinners);
                $provide.value('GameTimer', mocks.gameTimer);
            });


            inject(['$rootScope','$timeout', '$q', 'GameApi', function (_$rootScope_, _$timeout_, _$q_, _gameApi_) {
                $rootScope = _$rootScope_;
                timeout = _$timeout_;
                $q = _$q_;
                gameApi = _gameApi_;
            }]);

            sandbox = sinon.sandbox.create();
            authenticateUser = sinon.sandbox.mock(mocks.authenticateUser);
            ticketCreation = sinon.sandbox.mock(mocks.ticketCreation);
            userLogIn = sinon.sandbox.mock(mocks.userLogIn);
            checkWinners = sinon.sandbox.mock(mocks.checkWinners);
            gameTimer = sinon.sandbox.mock(mocks.gameTimer);
            stateChangeSpy = sinon.sandbox.spy(mocks.stateChange, 'go');
            handlePromiseSpy = sinon.sandbox.spy(gameApi, 'handlePromise');
        });


            it('Checks that functions are being called and the promise is being sent when logging out.', function(){
                var deferred = $q.defer(),
                    logOutSpy = sinon.sandbox.stub(mocks.authenticateUser, 'logOutInformation');
                logOutSpy.returns(deferred.promise);
                gameApi.logOut();
                $rootScope.$digest();
                handlePromiseSpy.should.have.been.calledOnce;
                stateChangeSpy.should.have.been.calledOnce;
        });

        it('Checks that functions are being called and the promise is being sent when getting the next game.', function(){
            var deferred = $q.defer(),
                getNextGameSpy = sinon.sandbox.stub(mocks.authenticateUser, 'nextGameInformation');
            getNextGameSpy.returns(deferred.promise);
            gameApi.getNextGame();
            $rootScope.$digest();
            handlePromiseSpy.should.have.been.calledOnce;
            stateChangeSpy.should.have.been.calledOnce;
        });

        it('Checks that functions are being called and the promise is being sent when buying a ticket.', function(){
            var deferred = $q.defer(),
                buyTicketSpy = sinon.sandbox.stub(mocks.authenticateUser, 'buyTicketInformation');
            buyTicketSpy.returns(deferred.promise);
            gameApi.buyTicket();
            $rootScope.$digest();
            handlePromiseSpy.should.have.been.calledOnce;
        });


        afterEach(function(){
            sandbox.restore();
            stateChangeSpy.restore();
            handlePromiseSpy.restore();
        })
    });
}());
