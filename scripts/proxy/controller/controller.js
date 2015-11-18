(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .controller('ApiController', ['$scope', 'GameApiModel', 'UserLogIn', 'BingoCall', 'GameTimer', 'ApiResponse',
                    function ($scope, gameApiModel, userLogIn, bingoCall, gameTimer, apiResponse) {
                            $scope.gameApi = gameApiModel;
                            $scope.userLogIn = userLogIn;
                            $scope.callingMethod = bingoCall;
                            $scope.playerDetails = apiResponse;
                            $scope.gameTimer = gameTimer;
                    }]);
})();