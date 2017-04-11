/*global angular */
/**
    'BookHome' Controller
    @dependencies : $scope object, $rootScope object, $location service, appVariable service, dataAdapter service
*/
var formController = function ($scope, $routeParams, $http) {
    'use strict';
    /**
        Parse url and set scope parameters
    */
    $scope.title = "Rate your Employee";
    $scope.name = '';
    $scope.age = '';
    $scope.department = '';
    $scope.formSubmitMessage = '';
    $scope.rating = '';
    $scope.submitStatus = function () {
        $http({
            method: 'POST',
            url: '/database',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                dbFunction: 'create',
                data: {
                    name: $scope.name,
                    age: $scope.age,
                    department: $scope.department,
                    rating: $scope.rating
                }
            }
        }).then(function successCallback(response) {
            $scope.formSubmitMessage = "Details are submitted";
            $scope.name = '';
            $scope.age = '';
            $scope.department = '';
            $scope.rating = '';
        }, function errorCallback(response) {
            $scope.formSubmitMessage = "An error occurred while submitting! Try Again ";
        });
    }
};
