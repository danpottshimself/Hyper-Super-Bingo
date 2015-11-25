(function () {
    'use strict';
    describe('Test BingoCallModel', function () {
        var timeout,
            $q,
            rootScope,
            sandbox,
            bingoCall,
            checkWinnerSpy,
            numbersMatchedSpy,
            response,
            response2,
            bingocCallSpy;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('TicketCreation', mocks.ticketCreation);
                $provide.value('UserLogIn', mocks.userLogIn);
                $provide.value('CheckWinners', mocks.checkWinners);
                $provide.value('BingoCallProxy', mocks.bingoCallApiProxy);
                $provide.value('TokenService', mocks.tokenService);
            });


            inject(['$rootScope','$timeout','$q', 'BingoCall', function (_$rootScope_, _$timeout_, _$q_,_bingoCall_) {
                rootScope = _$rootScope_;
                timeout = _$timeout_;
                $q = _$q_;
                bingoCall = _bingoCall_;
            }]);

            sandbox = sinon.sandbox.create();
            checkWinnerSpy =  sinon.sandbox.spy(mocks.checkWinners, 'checkForWinner');
            numbersMatchedSpy =  sinon.sandbox.spy(mocks.ticketCreation, 'ifNumbersMatch');
            response = {"message":"Call","callnumber":1,"call":54, "username":"drwho","balance":1980};
            response2 =  {"message":"Call","callnumber":2,"call":87,"username":"drwho","balance":1980};
            bingocCallSpy = sinon.sandbox.spy(bingoCall, 'bingoCall');
        });

        it('Checks that the bingoCall function makes the correct function calls.', function(){
            var deferred = $q.defer(),
                bingoCallSpy = sinon.sandbox.stub(mocks.bingoCallApiProxy, 'bingoCall');
            bingoCallSpy.returns(deferred.promise);

            bingoCall.bingoCall();
            deferred.resolve(response);
            rootScope.$digest();
            numbersMatchedSpy.should.have.been.calledOnce.calledWithExactly(response.call);
            checkWinnerSpy.should.have.been.calledOnce.calledWithExactly(response);
        });

        it('Checks that the bingoCall function is returning the correct information', function(){
            var deferred = $q.defer(),
                bingoCallInformationSpy = sinon.sandbox.stub(mocks.bingoCallApiProxy, 'bingoCall');
            bingoCallInformationSpy.returns(deferred.promise);

            bingoCall.bingoCall();
            deferred.resolve(response2);
            rootScope.$digest();
            numbersMatchedSpy.should.have.been.calledWithExactly(response2.call);
            checkWinnerSpy.should.have.been.calledOnce.calledWithExactly(response2);
        });


        afterEach(function(){
            sandbox.restore();
            checkWinnerSpy.restore();
            numbersMatchedSpy.restore();
        })
    });
}());
