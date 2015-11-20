(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .controller('ApiController', ['$scope', 'GameApiModel', 'UserLogIn', 'BingoCall', 'GameTimer',
                    function ($scope, gameApiModel, userLogIn, bingoCall, gameTimer) {
                            $scope.gameApi = gameApiModel;
                            $scope.userLogIn = userLogIn;
                            $scope.callingMethod = bingoCall;
                            $scope.gameTimer = gameTimer;
                    }]);
})();