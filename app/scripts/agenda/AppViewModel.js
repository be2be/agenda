define(['knockout', 'sammy', './InboxViewModel', './NextViewModel'],
function (ko, sammy, InboxViewModel, NextViewModel) {
    'use strict';

    var AppViewModel = function () {
        var self = this,
            app;

        self.chosenFolderId = ko.observable('inbox');
        self.folderTemplate = ko.computed(function () {
            return 'inbox-template';
        });

        self.folders = {
            'inbox': new InboxViewModel(),
            'next': new NextViewModel(),
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
