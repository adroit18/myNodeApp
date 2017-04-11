var ratingDirective = function ($http) {
    'use strict';
    return {
        restrict: 'EA',
        templateUrl: '/templates/rating.html',
        link: function (scope, element, attrs) {
            scope.name = [];
            scope.rating = [];
            scope.getRatings = function () {
                $http({
                    method: 'POST',
                    url: '/database',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        dbFunction: 'read',
                    }
                }).then(function successCallback(response) {
                        for (var i = 0; i < response.data.length; i++) {
                            scope.name[i] = response.data[i].name;

                            scope.rating[i] = response.data[i].rating;
                        };
                    },
                    function errorCallback(response) {});
            }

        }
    }
}
