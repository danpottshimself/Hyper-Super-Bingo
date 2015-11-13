(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('UserLogIn', ['$state', 'LogInServerApiProxy',
            function ($state, logInServerApiProxy) {
                var me  = this;

                me.logIn = function () {
                  logInServerApiProxy.logInInformation(me.username, me.password).then(function (response) {
                      me.balance = response.payload.user.balance/100;
                      me.token = response.payload.user.token;
                      me.username = response.payload.user.username;
                      $state.go('lobby');
                  });
                };

                me.logOut = function () {
                    logInServerApiProxy.logOutInformation(me.token).then(function (){
                        me.usermame = '';
                        me.password='';
                        $state.go('logIn');
                    });
                };

            }]);
})();