(function () {
    'use strict';
    describe('Test LogInProxy', function () {
        var sandbox,
            $state,
            returnedPromise,
            responseConverter,
            httpBackend,
            logInProxy;

        beforeEach(function () {
            module('ui.router');
            module('Tombola.Module.ApiCall', function ($provide) {
                $provide.value('ObjectConverter', mocks.objectConverter);
                $provide.value('TokenService', mocks.tokenService);
                $provide.value('LogInServerProxy', mocks.logInProxy);
            });

            inject(['$httpBackend', '$q', '$state', 'LogInServerApiProxy',
                function ($httpBackend, $q, state, LogInProxy) {
                    httpBackend = $httpBackend;
                    returnedPromise = $q;
                    logInProxy = LogInProxy;
                    $state = state;
                }]);

            sandbox = sinon.sandbox.create();
            responseConverter = sinon.sandbox.stub(mocks.objectConverter,'responseConverter', function (response){ return response });
        });


        it('Ensures the post log in is working and returns values', function () {
            var expectedResponse = {
                    "message": "LoginSuccess",
                    "payload": {
                        "user": {
                            "username": "drwho",
                            "balance": 20000,
                            "token": "f36bb73b-83cc-4539-aac0-893914bc73ec"
                        }
                    }
                },
                data = {
                    "username": 'drwho',
                    "password": 'tardis123!'
                };
            httpBackend.expectPOST("http://eutaveg-01.tombola.emea:30069/users/login", data)
                .respond(function (){
                    return [200, expectedResponse];
                });

            logInProxy.callApi("/users/login", data, {}, 'POST')
            .then(function (response) {
                response.should.be.deep.equal(expectedResponse);
            });
            httpBackend.flush();
        });

        it('Ensures the log in returns the correct data when a failed response is returned', function () {
            var expectedResponse = {
                    "message": "Log In Fail"
                },
                data = {
                    "username": 'drwho',
                    "password": 'tardis123!'
                };
            httpBackend.expectPOST("http://eutaveg-01.tombola.emea:30069/users/login", data)
                .respond(function (){
                    return [400, expectedResponse];
                });

            logInProxy.callApi("/users/login", data, {}, 'POST')
                .catch(function (response) {
                    response.should.be.deep.equal(expectedResponse);
                });
            httpBackend.flush();
        });

        it('Ensures the log out returns the correct data when a successful post has been made', function () {
            var expectedResponse = {
                    "message": "Logout Successful"
                },
                token = "f36bb73b-83cc-4539-aac0-893914bc73ec",
                headers= {
                'x-token': token,
                    'content-type': 'application/json'
                };
            httpBackend.expectPOST("http://eutaveg-01.tombola.emea:30069/users/logout", token)
                .respond(function (){
                    return [200, expectedResponse];
                });

            logInProxy.callApi("/users/logout", token, headers, 'POST')
                .then(function (response) {
                    response.should.be.deep.equal(expectedResponse);
                });
            httpBackend.flush();
        });

        it('Ensures the log out returns the correct data when a successful post has been made', function () {
            var expectedResponse = {
                    "message": "Logout Failed"
                },
                token = "f36bb73b-83cc-4539-aac0-893914bc73ec",
                headers= {
                    'x-token': token,
                    'content-type': 'application/json'
                };
            httpBackend.expectPOST("http://eutaveg-01.tombola.emea:30069/users/logout", token)
                .respond(function (){
                    return [400, expectedResponse];
                });

            logInProxy.callApi("/users/logout", token, headers, 'POST')
                .catch(function (response) {
                    response.should.be.deep.equal(expectedResponse);
                });
            httpBackend.flush();
        });

        afterEach(function () {
            sandbox.restore();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        })
    });
}());

