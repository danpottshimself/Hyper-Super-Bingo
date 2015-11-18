angular.module('Tombola.Module.ApiCall')
    .service('LogInServerApiProxy',['$http', '$q',
        function ($http, $q) {
            var me = this;
            me.callApi = function (endUrl, data, token, requestType) {
                var deferred = $q.defer();
                request = {
                    url: 'http://eutaveg-01.tombola.emea:30069' + endUrl,
                    data: data,
                    headers: {
                        'x-token': token,
                        'content-type': 'application/json'},
                    method: requestType
                };

                $http(request)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            };

            me.logInInformation = function (username, password) {
                var data = {
                    "username": username,
                    "password": password
                };
                return me.callApi('/users/login', data, {}, 'POST');
            };

            me.logOutInformation = function (token) {
                return me.callApi('/users/logout', {}, token, 'POST');
            };
        }]);