// define app and dependencies
angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/about',         { templateUrl: 'partials/about.html' })

        .when('/home',         { templateUrl: 'partials/home.html' })
        .when('/',             { templateUrl: 'partials/home.html' })
        .otherwise({ redirectTo: '/' });
}]);
