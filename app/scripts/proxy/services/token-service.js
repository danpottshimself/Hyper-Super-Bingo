(function () {
    'use strict';
    angular.module('Tombola.Module.Main')
        .service('TokenService', function () {
            var token = null;

            return {
                isAuthenticated: function () {
                    return token !== null;
                },
                getToken: function () {
                    return token;
                },
                setToken: function (tokenFromApi) {
                    token = tokenFromApi;
                },
                resetToken: function () {
                    this.setToken(null);
                }
            };
        });
})();