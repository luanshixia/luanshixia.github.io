/// <reference path="../../js/angular.js" />
(function () {
    "use strict";

    var STICKY_RANK = 1000;

    var tags = ["Other", "Web", ".NET", "Cool", "Life", "Thinking"];

    var posts = [
        { title: "Welcome", file: "welcome.md", date: "2015-4-15 15:00:00", tags: "Other", rank: STICKY_RANK }
    ];

    angular.module("app", []).value("Posts", posts);
})();