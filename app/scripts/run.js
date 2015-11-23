(function () {
    'use strict';
    angular.module('Tombola.Module.Main')
        .run(['$rootScope', '$state', 'TokenService', function ($rootScope, $state, tokenService) {
            $rootScope.$on('$locationChangeSuccess', function () {
                if (!tokenService.isAuthenticated()) {
                    $state.go('logIn');
                }
            });
        }]);
})();