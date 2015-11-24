(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('GameTimer', ['$state', '$interval', 'BingoCall',
            function ($state, $interval, bingoCall) {
                var me = this,
                    timer;
                me.hideMe = false;
                me.timeTillGame = function (time) {
                    me.hideMe =false;
                    var realTime = new Date(),
                        gameTime = new Date(time),
                        timeDifference = Math.abs(gameTime.getTime() - realTime.getTime());
                    me.timeBeforeStart = (timeDifference / 1000).toFixed(0);
                    timer = $interval(me.updateTime, 1000, me.timeBeforeStart);
                };

                me.updateTime = function () {
                    me.timeBeforeStart -= 1;
                    if (me.timeBeforeStart === 0) {
                        me.hideMe = true;
                        me.stop();
                        bingoCall.bingoCall();
                    }
                };

                me.stop = function (){
                    $interval.cancel(timer);
                };
            }]);
})();