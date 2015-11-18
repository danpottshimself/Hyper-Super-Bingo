(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('UserLogIn', ['$state', 'LogInServerApiProxy','ApiResponse',
            function ($state, logInServerApiProxy, apiResponse) {
                var me  = this;

                me.logIn = function () {
                  logInServerApiProxy.logIn(me.username, me.password).then(function () {
                      $state.go('lobby');
                  });
                };

                me.logOut = function () {
                    logInServerApiProxy.logOut(apiResponse.userDetails.token).then(function (){
                        $state.go('logIn');
                    });
                };

            }]);
})();