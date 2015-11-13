(function () {
    'use strict';
    describe('Test EndOfGame', function () {
        var interval,
            sandbox,
            $state,
            updateTimerSpy,
            bingoCallSpy,
            stopSpy,
            gameTimer;

        beforeEach(function(){
            module('ui.router');
            module('Tombola.Module.ApiCall', function($provide){
                $provide.value('BingoCall', mocks.callingMethod);
            });

            inject(function($injector){
                interval = $injector.get('$interval');
                gameTimer = $injector.get('GameTimer');
                $state = $injector.get('$state');
            });
            sandbox = sinon.sandbox.create();
            updateTimerSpy = sinon.sandbox.spy(gameTimer, 'updateTime');
            bingoCallSpy = sinon.sandbox.spy(mocks.callingMethod, 'bingoCall');
            stopSpy = sinon.sandbox.spy(gameTimer, 'stop');
        });

        it('Checks that the state changes to draw when game is drawn.', function(){
            gameTimer.timeTillGame();
            interval.flush(1000);
            updateTimerSpy.should.have.been.calledOnce;
        });

        //it('Checks that the state changes to draw when game is drawn.', function(){
        //    gameTimer.timeBeforeStart = 0;
        //    gameTimer.updateTime();
        //    stopSpy.should.have.been.calledOnce;
        //    bingoCallSpy.should.have.been.calledOnce;
        //});


        afterEach(function(){
            sandbox.restore();
            bingoCallSpy.restore();
            stopSpy.restore();
            updateTimerSpy.restore();
        })
    });
}());
