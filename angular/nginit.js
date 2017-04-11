var app;
var angularLoadCallback = function () {
    file_version = Math.random();
    app = angular.module('myApp', ['ngRoute']);
    app.config(function ($routeProvider, $locationProvider, $httpProvider, $windowProvider) {
        $routeProvider
            .when("/ratingForm", {
                controller: "formController",
                templateUrl: "/templates/form.html"
            })
            .when("/", {
                controller: "loginController",
                templateUrl: "/templates/login.html"
            })
            .otherwise({
                template: "< div > 404 < /div>"
            });
        $locationProvider.html5Mode({
            enabled: true,
            //            requireBase: false
        });
    });



    //    app.service('se_searchList', se_searchList);
    app.directive('headerDirective', headerDirective);
    app.directive('ratingDirective', ratingDirective);
    app.controller('formController', formController);
    app.controller('loginController', loginController);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['myApp'], {});

    });

};
