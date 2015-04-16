/// <reference path="../../js/angular.js" />
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

        //$scope.$watch(function () {
        //    return location.hash
        //}, function (value) {
        //    $scope.loadPost(value.substring(1));
        //});

        $scope.$on("$routeChangeSuccess", function () {
            $scope.loadPost($routeParams.id);
        });

        if (location.hash) {
            $scope.loadPost($routeParams.id);
        }
    });
})();