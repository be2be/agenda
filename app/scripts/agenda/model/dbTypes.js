define(['underscore'], function (_) {
    'use strict';

    var generateId,
        project,
        task,
        projectPattern = /^project\.\d+\.\d+$/,
        taskPattern = /^task\.\d+\.\d+$/;

    generateId = (function() {
        var i = 0;
        return function(prefix) {
            var ret;
            if (prefix) {
                ret = prefix + "." + Date.now() + "." + i++;
            } else {
                ret = Date.now() + "." + i++;
            }
            return ret;
        };
    }());

    project = function() {

    };

    task = function(obj) {
        var task = {},
            validStates = ['inbox', 'next', 'scheduled', 'waiting',
                           'someday', 'done', 'trash'];
        obj = obj || {};

        if (_.isString(obj.context)) {
            task.context = obj.context;
        } else {
            task.context = null;
        }

        if (_.isDate(obj.date) || _.isNull(obj.date)) {
            task.dueOn = obj.dueOn;
        } else {
            task.dueOn = null;
        }

        if (taskPattern.test(obj.id)) {
            task.id = obj.id;
        } else {
            task.id = generateId('task');
        }

        if (_.isString(obj.notes)) {
            task.notes = obj.notes;
        } else {
            task.notes = '';
        }

        if (_.isString(obj.project) || _.isString(obj.project) &&
            projectPattern.test(obj.project)) {
            task.project = obj.project;
        } else {
            task.project = null;
        }

        if (_.isBoolean(obj.starred)) {
            task.starred = obj.starred;
        } else {
            task.starred = false;
        }

        if (_.isDate(obj.startsOn)) {
            task.startsOn = obj.startsOn;
        } else {
            task.startsOn = null;
        }

        if (_.include(validStates, obj.state)) {
            task.state = obj.state;
        } else {
            task.state = 'inbox';
        }

        if (_.isString(obj.title)) {
            task.title = obj.title;
        } else {
            task.title = '';
        }

        return task;
    };

    return {
        task: task,
        project: project
    };
});
