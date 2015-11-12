angular.module('Tombola.Module.ApiCall', []);
angular.module('Tombola.Module.Ticket', []);
angular.module('Tombola.Module.Main', ['ui.router', 'Tombola.Module.ApiCall', 'Tombola.Module.Ticket'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/logIn");

    $stateProvider
        .state('logIn', {
            url: "/logIn",
            templateProvider:function ($templateCache){ return $templateCache.get("html/login.html");}
        })
        .state('lobby', {
            url: "/lobby",
            templateProvider:function ($templateCache){ return $templateCache.get("html/lobby.html");}
        })
        .state('tickets', {
            url: "/tickets",
            templateProvider:function ($templateCache){ return $templateCache.get("ticketMaster");}
        });
    });