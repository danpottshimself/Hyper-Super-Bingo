(function () {
        'use strict';
        angular.module('Tombola.Module.ApiCall')
            .controller('ApiController', ['$scope', 'AuthenticateUser', 'GameApi', 'UserLogIn',
                    function ($scope, authenticateUser, gameApi, userLogIn) {
                            $scope.authenticateUser = authenticateUser;
                            $scope.gameApi = gameApi;
                            $scope.userLogIn = userLogIn;
                    }]);
})();