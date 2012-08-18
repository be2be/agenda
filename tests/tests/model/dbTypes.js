/*global asyncTest, deepEqual, equal, expect, module, ok, start, stop,
  strictEqual, test */
define(['agenda/model/dbTypes'], function (dbTypes) {
    'use strict';

    var taskPattern = /^task\.\d+\.\d+$/,
        projectPattern = /^project\.\d+\.\d+$/;

    module('model:dbTypes');

    test('task()', function () {
        expect(11);
        var task, newTask;

        task = dbTypes.task();
        strictEqual(task.dueOn, null, 'No due date by default.');
        ok(taskPattern.test(task.id), 'Id matches expected pattern.');
        strictEqual(task.notes, '', 'notes are empty by default.');
        strictEqual(task.project, null, 'No project by default.');
        strictEqual(task.starred, false, 'Default value of starred is false.');
        strictEqual(task.startsOn, null, 'No start date by default.');
        strictEqual(task.state, 'inbox', 'Default state is "inbox".');
        deepEqual(task.context, null, 'No context by default.');
        strictEqual(task.title, '', 'title is empty by default.');

        newTask = dbTypes.task({});
        newTask.id = task.id = '';
        deepEqual(newTask, task, 'task() and task({}) behave equally.');

        task = dbTypes.task({ state: 'next'});
        strictEqual(task.state, 'next');
    });

});
