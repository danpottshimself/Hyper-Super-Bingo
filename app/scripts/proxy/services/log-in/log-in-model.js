(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('UserLogIn', ['$state', 'Proxy','TokenService',
            function ($state, proxy, tokenService) {
                var me  = this;

                me.logIn = function () {
                  proxy.logIn(me.username, me.password).then(function (response) {
                      me.balance = response.balance;
                      tokenService.setToken(response.token);
                      lobbyStateChange();
                  });
                };

                me.logOut = function () {
                    proxy.logOut(tokenService.getToken()).then(function (){
                        tokenService.resetToken();
                        logInStateChange();
                    });
                };

                var lobbyStateChange = function (){
                    return $state.go('lobby');
                    },
                    logInStateChange = function () {
                     return $state.go('logIn');
                    };

            }]);
})();