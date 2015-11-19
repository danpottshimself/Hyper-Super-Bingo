(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('UserLogIn', ['$state', 'LogInServerApiProxy','TokenService',
            function ($state, logInServerApiProxy, tokenService) {
                var me  = this;

                me.logIn = function () {
                  logInServerApiProxy.logIn(me.username, me.password).then(function (response) {
                      me.balance = response.balance;
                      tokenService.setToken(response.token);
                      $state.go('lobby');
                  });
                };

                me.logOut = function () {
                    logInServerApiProxy.logOut(tokenService.getToken()).then(function (){
                        tokenService.resetToken();
                        $state.go('logIn');
                    });
                };

            }]);
})();