///*global angular */
///**
//    'BookHome' Controller
//    @dependencies : $scope object, $rootScope object, $location service, appVariable service, dataAdapter service
//*/
//var loginController = function ($scope, $routeParams, $http) {
//    'use strict';
//    /**
//        Parse url and set scope parameters
//    */
//
//    $scope.name = '';
//    $scope.age = '';
//
//    $scope.googleLogin = function () {
//
//        $http({
//            method: 'GET',
//            url: '/googleAuth',
//        }).then(function successCallback(response) {},
//            function errorCallback(response) {});
//
//    }
//}
var loginController = function ($scope, $http, $location, $route) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
    $scope.showFormButton = false;
    $scope.username = '';
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function (authResult) {
        // Do a check if authentication has been successful.
        if (authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
            $scope.getUserInfo(authResult['access_token']);
            //     ...
            // Do some work [1].
            //     ...
        } else if (authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;

            // Report error.
        }
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function (authResult) {
        $scope.$apply(function () {
            $scope.processAuth(authResult);
        });
    };
    //9kgUrrcvaTVvdjcoV-3rk40Y client secret
    // Render the sign in button.
    $scope.renderSignInButton = function () {
        gapi.signin.render('signInButton', {
            'callback': $scope.signInCallback, // Function handling the callback.
            'clientid': '981728692829-jic7hjhr5ank6ql9dqv3jf9a790ifvtt.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
            'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
            // as their explanation is available in Google+ API Documentation.
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
            'cookiepolicy': 'single_host_origin'
        });
    }

    // Start function in this example only renders the sign in button.
    $scope.start = function () {
        $scope.renderSignInButton();
    };

    // Call start function on load.
    $scope.start();


    // Process user info.
    // userInfo is a JSON object.
    $scope.processUserInfo = function (userInfo) {
        // You can check user info for domain.
        if (userInfo['email']) {
            // Hello colleague!
            $scope.username = userInfo['email'];
            sendMail(userInfo['email']);
        }

        // Or use his email address to send e-mails to his primary e-mail address.
    }

    // When callback is received, process user info.
    $scope.userInfoCallback = function (userInfo) {
        $scope.$apply(function () {
            $scope.processUserInfo(userInfo);
        });
    };

    // Request user info.
    $scope.getUserInfo = function (accessT) {
        gapi.client.request({
            'path': 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + accessT,
            'method': 'GET',
            'callback': $scope.userInfoCallback
        });
    };
    $scope.signOut = function () {
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:201/angular";
    }

    function sendMail(emailId) {
        $http({
            method: 'POST',
            url: '/sendMail',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                emailId: emailId
            }
        }).then(function successCallback(response) {
            $scope.showFormButton = true;
        }, function errorCallback(response) {});
    }
}
