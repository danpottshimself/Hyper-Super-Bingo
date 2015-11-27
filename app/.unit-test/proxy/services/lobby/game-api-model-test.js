(function () {
    'use strict';
    describe('Test gameApi', function () {
        var stateChangeSpy,
            timeout,
            sandbox,
            handlePromiseSpy,
            $q,
            $rootScope,
            gameApiModel;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('$state', mocks.stateChange);
                $provide.value('GameApiProxy', mocks.authenticateUser);
                $provide.value('TicketCreation', mocks.ticketCreation);
                $provide.value('UserLogIn', mocks.userLogIn);
                $provide.value('CheckWinners', mocks.checkWinners);
                $provide.value('GameTimer', mocks.gameTimer);
                $provide.value('TokenService', mocks.tokenService);
            });


            inject(['$rootScope','$timeout', '$q', 'GameApiModel', function (_$rootScope_, _$timeout_, _$q_, _gameApiModel_) {
                $rootScope = _$rootScope_;
                timeout = _$timeout_;
                $q = _$q_;
                gameApiModel = _gameApiModel_;
            }]);

            sandbox = sinon.sandbox.create();
            stateChangeSpy = sinon.sandbox.spy(mocks.stateChange, 'go');
            handlePromiseSpy = sinon.sandbox.spy(gameApiModel, 'handlePromise');
        });

        it('Checks that functions are being called and the promise is being sent when getting the next game.', function(){
            var deferred = $q.defer(),
                getNextGameSpy = sinon.sandbox.stub(mocks.authenticateUser, 'nextGame');
            getNextGameSpy.returns(deferred.promise);
            gameApiModel.getNextGame();
            $rootScope.$digest();
            handlePromiseSpy.should.have.been.calledOnce;
            stateChangeSpy.should.have.been.calledOnce;
        });

        it('Checks that functions are being called and the promise is being sent when buying a ticket.', function(){
            var deferred = $q.defer(),
                buyTicketSpy = sinon.sandbox.stub(mocks.authenticateUser, 'buyTicket');
            buyTicketSpy.returns(deferred.promise);
            gameApiModel.buyTicket();
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
