(function () {
    'use strict';
    angular.module('Tombola.Module.ApiCall')
        .service('UserLogIn', ['$state', 'AuthenticateUser', 'DataHandle',
            function ($state, authenticateUser, dataHandle) {
                var me  = this;
                me.logIn = function () {
                    var promise = me.logInInformation(me.username, me.password);
                    me.handlePromise(promise);
                    $state.go('lobby');
                };

                me.logInInformation = function (username, password) {
                    var data = {
                            "username": username,
                            "password": password
                        },
                        headers = {
                            'content-type': 'application/json'
                        };
                    return dataHandle.dataHandler('/users/login', data, headers, 'POST');
                };

                me.handlePromise = function (promise) {
                    promise.then(function (response) {
                        me.balance = response.payload.user.balance/100;
                        me.token = response.payload.user.token;
                        me.username = response.payload.user.username;
                        return response;
                    })
                        .catch(function (response) {
                            console.log(response);
                        });
                };

            }]);
})();