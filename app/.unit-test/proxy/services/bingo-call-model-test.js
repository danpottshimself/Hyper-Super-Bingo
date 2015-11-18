(function () {
    'use strict';
    describe('Test BingoCallModel', function () {
        var timeout,
            $q,
            rootScope,
            sandbox,
            bingoCall,
            logInServerApiProxy,
            ticketCreation,
            bingoCallApiProxy,
            checkWinnerSpy,
            numbersMatchedSpy,
            expectedString,
            expectedString2,
            userLogIn,
            bingocallSpy,
            checkWinners;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('LogInServerApiProxy', mocks.logInProxy);
                $provide.value('TicketCreation', mocks.ticketCreation);
                $provide.value('UserLogIn', mocks.userLogIn);
                $provide.value('CheckWinners', mocks.checkWinners);
                $provide.value('GameTimer', mocks.gameTimer);
                $provide.value('BingoCallApiProxy', mocks.bingoCallApiProxy);
            });


            inject(['$rootScope','$timeout','$q', 'BingoCall', function (_$rootScope_, _$timeout_, _$q_,_bingoCall_) {
                rootScope = _$rootScope_;
                timeout = _$timeout_;
                $q = _$q_;
                bingoCall = _bingoCall_;
            }]);

            sandbox = sinon.sandbox.create();
            logInServerApiProxy = sinon.sandbox.mock(mocks.logInProxy);
            ticketCreation = sinon.sandbox.mock(mocks.ticketCreation);
            userLogIn = sinon.sandbox.mock(mocks.userLogIn);
            checkWinners = sinon.sandbox.mock(mocks.checkWinners);
            bingoCallApiProxy =  sinon.sandbox.mock(mocks.bingoCallApiProxy);
            checkWinnerSpy =  sinon.sandbox.spy(mocks.checkWinners, 'checkForWinner');
            numbersMatchedSpy =  sinon.sandbox.spy(mocks.ticketCreation, 'ifNumbersMatch');
            expectedString = {"message":"Call","payload":{"gameId":1,"callnumber":1,"call":54,"user":{"username":"drwho","balance":1990,"token":"f36bb73b-83cc-4539-aac0-893914bc73ec"}}};
            expectedString2 =  {"message":"Call","payload":{"gameId":1,"callnumber":2,"call":87,"user":{"username":"drwho","balance":1980,"token":"f36bb73b-83cc-4539-aac0-893914bc73ec"}}};
            bingocallSpy = sinon.sandbox.spy(bingoCall, 'bingoCall');
        });

        it('Checks that the bingoCall function makes the correct function calls.', function(){
            var deferred = $q.defer(),
                bingoCallInformationSpy = sinon.sandbox.stub(mocks.bingoCallApiProxy, 'bingoCallInformation');
            bingoCallInformationSpy.returns(deferred.promise);

            bingoCall.bingoCall();
            deferred.resolve(expectedString);
            rootScope.$digest();
            numbersMatchedSpy.should.have.been.calledOnce.calledWithExactly(bingoCall.call);
            checkWinnerSpy.should.have.been.calledOnce;
            bingoCall.call.should.equal(54);
        });

        it('Checks that the bingoCall function is returning the correct information', function(){
            var deferred = $q.defer(),
                bingoCallInformationSpy = sinon.sandbox.stub(mocks.bingoCallApiProxy, 'bingoCallInformation');
            bingoCallInformationSpy.returns(deferred.promise);

            bingoCall.bingoCall();
            deferred.resolve(expectedString2);
            rootScope.$digest();
            numbersMatchedSpy.should.have.been.calledOnce.calledWithExactly(bingoCall.call);
            checkWinnerSpy.should.have.been.calledOnce;
            bingoCall.call.should.equal(87);
            bingoCall.balance.should.equal(19.80);
        });


        afterEach(function(){
            sandbox.restore();
            checkWinnerSpy.restore();
            numbersMatchedSpy.restore();
        })
    });
}());
