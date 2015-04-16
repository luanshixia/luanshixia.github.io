/// <reference path="../../js/angular.js" />

angular.module("app", ["ngRoute", "ngSanitize"]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/post/:id', {
        templateUrl: 'views/post.html',
        controller: "PostController"
    }).otherwise({
        redirectTo: '/'
    });
}]);

(function () {
    "use strict";

    var STICKY_RANK = 1000;

    var tags = ["Other", "Web", ".NET", "Cool", "Life", "Thinking"];

    var posts = {
        "welcome": { title: "Welcome", date: "2015-4-15 15:00:00", tags: "Other", lang: "en", rank: STICKY_RANK },
        "readme": { title: "Readme", date: "2015-4-16 15:00:00", tags: "Other", lang: "en", rank: STICKY_RANK }
    };

    angular.module("app").value("Posts", posts);
})();