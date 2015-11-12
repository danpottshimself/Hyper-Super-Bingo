angular.module('Tombola.Module.ApiCall')
    .service('DataHandle',['$http', '$q',
        function ($http, $q) {
            var me = this;
            me.dataHandler = function (endUrl, data, headers, requestType) {
                var deferred = $q.defer();
                request = {
                    method: requestType,
                    url: 'http://eutaveg-01.tombola.emea:30069' + endUrl,
                    data: data,
                    headers: headers
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
        }]);