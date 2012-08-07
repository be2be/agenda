define(['knockout', 'sammy'], function (ko, sammy) {
    'use strict';

    var AppViewModel = function () {
        var self = this,
            app;

        self.chosenFolderId = ko.observable('inbox');

        self.folders = {
            'inbox': { count: ko.observable(5) },
            'next': {},
            'starred': {}
        };

        self.projects = ko.observableArray([
            {title: 'Foo', id: 'foo', href: '#/project/foo'},
            {
                title: 'Bar',
                id: 'bar',
                href: ko.computed(function () {
                    return '#/project/' + 'bar';
                })
            }
        ]);

        function goToFolder(folder) {
            self.chosenFolderId(folder);
        }

        // Routes
        app = sammy(function () {
            this.get('#/:folder', function () {
                goToFolder(this.params.folder);
            });

            this.get('#/project/:folder', function() {
                goToFolder(this.params.folder);
            });

            this.get('', function () {
                this.app.runRoute('get', '#/inbox');
            });
        });
        app.run();
    };

    return AppViewModel;
});
