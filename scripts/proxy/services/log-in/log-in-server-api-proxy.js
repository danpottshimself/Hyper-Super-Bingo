angular.module('Tombola.Module.ApiCall')
    .service('LogInServerApiProxy',['$http', '$q', 'ApiResponse','ObjectConverter',
        function ($http, $q, apiResponse, objectConverter) {
            var me = this;
            me.callApi = function (endUrl, data, requestType) {
                var deferred = $q.defer();
                request = {
                    url: 'http://eutaveg-01.tombola.emea:30069' + endUrl,
                    data: data,
                    headers: {
                        'x-token': apiResponse.userDetails.token,
                        'content-type': 'application/json'},
                    method: requestType
                };

                $http(request)
                    .then(function (response) {
                        deferred.resolve(objectConverter.responseConverter(response.data, endUrl));

                    })
                    .catch(function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            };

            me.logIn = function (username, password) {
                var data = {
                    "username": username,
                    "password": password
                };
                return me.callApi('/users/login', data, 'POST');
            };

            me.logOut = function () {
                return me.callApi('/users/logout', {}, 'POST');
            };
        }]);