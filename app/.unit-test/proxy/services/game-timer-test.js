//(function () {
//    'use strict';
//    describe('Test EndOfGame', function () {
//        var interval,
//            $state,
//            gameTimer;
//
//        beforeEach(function(){
//            module('Tombola.Module.ApiCall', function($provide){
//                $provide.value('BingoCall', mocks.callingMethod);
//            });
//
//            inject(function($injector){
//                interval = $injector.get('$interval');
//                gameTimer = $injector.get('GameTimer');
//                $state = $injector.get('$state');
//            });
//
//
//            //stateChangeSpy = sinon.sandbox.spy(mocks.callingMethod, 'bingoCall');
//        });
//
//        it('Checks that the state changes to draw when game is drawn.', function(){
//            gameTimer.timeTillGame();
//            interval.flush();
//            gameTimer.updateTime.should.have.been.calledOnce;
//
//        });
//
//
//        afterEach(function(){
//
//        })
//    });
//}());
