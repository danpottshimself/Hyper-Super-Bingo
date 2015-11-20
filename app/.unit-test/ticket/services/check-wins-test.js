(function () {
    'use strict';
    describe('Test EndOfGame', function () {
        var $timeout,
            sandbox,
            userLogIn,
            $rootScope,
            $state,
            lineWinnerSpy,
            houseWinnerSpy,
            stateChangeSpy,
            response,
            checkWinners;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('UserLogIn', mocks.userLogIn);
            });

            inject(function($injector){
                $rootScope = $injector.get('$rootScope');
                $timeout = $injector.get('$timeout');
                checkWinners = $injector.get('CheckWinners');
                $state = $injector.get('$state');
            });
            sandbox = sinon.sandbox.create();
            userLogIn = sinon.sandbox.mock(mocks.userLogIn);
            lineWinnerSpy = sinon.sandbox.spy(checkWinners, 'lineWinner');
            houseWinnerSpy = sinon.sandbox.spy(checkWinners, 'houseWinner');
            stateChangeSpy = sinon.sandbox.spy(mocks.stateChange, 'go');
            $rootScope.$digest();
        });

        it('Checks that the server response for a line is recognised', function(){
            response = {message: 'Line' , payload:{winnerInfo : {lineprize:4}}};
            checkWinners.checkForWinner(response);
            lineWinnerSpy.should.have.been.calledWithExactly(response);
            checkWinners.lineMessage.should.equal('Well Done! You have won the line prize of £'  + 4);

        });

        it.skip('Checks that the server response for a house is recognised', function(){
            response = {message: 'Winner' , payload:{winnerInfo : {houseprize:10}}};
            checkWinners.checkForWinner(response);
            houseWinnerSpy.should.have.been.calledWithExactly(response);
            checkWinners.houseMessage.should.equal('Well Done! You have won the house prize of £'  + 10);
        });

        afterEach(function(){
            sandbox.restore();
            stateChangeSpy.restore();
            houseWinnerSpy.restore();
            lineWinnerSpy.restore();
        })
    });
}());