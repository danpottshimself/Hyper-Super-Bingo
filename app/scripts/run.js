(function () {
    'use strict';
    angular.module('Tombola.Module.Main')
        .service('UserLogIn', ['$state', 'tokenService',
            function ($state, tokenService) {
            $rootScope.$on('$locationChangeSuccess', function() {
                if (!tokenService.isAuthenticated()) {
                    $state.go('logIn');
                }
            });
            }]);
})();