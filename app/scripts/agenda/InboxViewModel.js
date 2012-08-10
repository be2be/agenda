define(['knockout'], function (ko) {
    'use strict';

    var FolderViewModel = function () {
        var self = this;

        self.template = 'inbox-template';

        self.tasks = [{title: "Hello"}, {title: "World"}];

        self.taskCount = ko.observable(3);
    };

    return FolderViewModel;
});
