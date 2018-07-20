/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.2/angular.js" />

(function () {
    "use strict";

    angular.module("app").controller("PostController", function ($scope, $http, $routeParams, Posts) {

        $scope.loadPost = function (id) {
            var post = Posts[id];
            $scope.title = post.title;
            $scope.date = post.date;
            $http.get("post/" + id + ".txt").success(function (result) {
                $scope.content = markdown.toHTML(result);
            });
        };

        $scope.$on("$routeChangeSuccess", function () {
            $scope.loadPost($routeParams.id);
        });
    });
})();
