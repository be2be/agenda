define(['jquery', 'knockout', 'agenda/model/model', 'agenda/model/dbTypes'],
function ($, ko, model, dbTypes) {
    'use strict';
    var AddTaskViewModel = function (id) {

        // State

        this.validStates = dbTypes.validStates;

        this.context = ko.observable(null);
        this.state = ko.observable('inbox');
        this.title = ko.observable('');

        this.addTask = function () {};

        // Behavior

        this.show = function () {
            $(id).modal('show');
        };

        this.hide = function () {
            $(id).modal('hide');
        };

        this.reset = function () {
            this.context(null);
            this.state('inbox');
            this.title('');
        };

        this.addTask = function () {};

    };

    return AddTaskViewModel;
});
