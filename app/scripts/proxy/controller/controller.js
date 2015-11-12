(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .controller('ApiController', ['$scope', 'AuthenticateUser', 'GameApi', 'UserLogIn', 'BingoCall', 'GameTimer',
                    function ($scope, authenticateUser, gameApi, userLogIn, bingoCall, gameTimer) {
                            $scope.authenticateUser = authenticateUser;
                            $scope.gameApi = gameApi;
                            $scope.userLogIn = userLogIn;
                            $scope.callingMethod = bingoCall;
                            $scope.gameTimer = gameTimer;
                    }]);
})();