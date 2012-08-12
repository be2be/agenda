/*jshint browser: true */
/*global asyncTest, deepEqual, equal, expect, module, ok, start, stop,
  strictEqual, test */
define(['agenda/model/model', 'underscore'],
function (model, _) {
    'use strict';
    var taskPattern = /^task\.\d+\.\d+$/,
        projectPattern = /^project\.\d+\.\d+$/,
        tasks;

    tasks = {
        inboxTask1: {
            title: 'A new task'
        },
        nextTask1: {
            title: 'Next Task 1',
            state: 'next'
        },
        nextTask2: {
            title: 'Next Task 2',
            state: 'next'
        }
    };

    _.each(tasks, function (task) {
        model.tasks.add(task);
    });

    setTimeout(function () {
        module("model:model");

        test('tasks.add()', function () {
            expect(2);
            var inTask;

            stop();
            inTask = tasks.inboxTask1;
            model.tasks.add(inTask, function (taskId) {
                ok(taskPattern.test(taskId), 'A task was added and it has a valid ID');
                model.tasks.get(taskId, function (task) {
                    equal(task.title, inTask.title, 'The task has the correct title.');
                    start();
                });
            });
        });

        test('tasks.get()', function () {
            expect(2);

            stop();
            model.tasks.get({ state: 'next' }, function (tasks) {
                ok(_.isArray(tasks) && tasks.length > 0,
                    'callback gets non-empty array of tasks.');
                ok(_.all(tasks, function (task) { return task.state === 'next'; }),
                    'tasks have the correct state.');
                start();
            });
        });

    }, 1000);
});
