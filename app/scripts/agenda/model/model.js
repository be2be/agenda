/*jshint browser: true, devel: true */
/*global IDBCursor, IDBKeyRange, IDBTransaction */
define(['./dbTypes', 'jquery', 'underscore'],
function (dbTypes, $, _) {
    'use strict';

    var contexts, tasks, projects, openingDB;
    openingDB = new $.Deferred();

    window.indexedDB = window.indexedDB || window.mozIndexedDB;

    (function () {
        var request;
        request = window.indexedDB.open('agenda', 1);
        request.addEventListener('error', function() { console.log("addListener");});

        request.onerror = function (event) {
            console.warn('Database agenda could not be opened.');
            openingDB.reject();
        };

        request.onupgradeneeded = function (event) {
            var db, taskStore, contextStore;
            db = event.target.result;

            console.log("Create ObjectStore for tasks.");
            taskStore = db.createObjectStore('tasks', { keyPath: 'id' });

            taskStore.createIndex('state', 'state', { unique: false });
            taskStore.createIndex('project', 'project', { unique: false });
            taskStore.createIndex('context', 'context', { unique: false });
        };

        request.onsuccess = function (event) {
            var db = request.result;
            openingDB.resolve(db);
            console.log('Database "agenda" succesfully opened.');
        };
    }.call());

    function getAll(iterable, range) {
        var allItems = [],
            defer = $.Deferred(),
            gettingCursor = iterable.openCursor(range);

        gettingCursor.onerror = function () {
            defer.reject();
        };

        gettingCursor.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                allItems.push(cursor.value);
                cursor.continue();
            } else {
                defer.resolve(allItems);
            }
        };

        return defer.promise();
    }

    function getAllKeys(iterable, range) {
        var allKeys = [],
            defer = $.Deferred(),
            gettingCursor = iterable.openKeyCursor(range, IDBCursor.NEXT_NO_DUPLICATE);

        gettingCursor.onerror = function () {
            defer.reject();
        };

        gettingCursor.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                allKeys.push(cursor.key);
                cursor.continue();
            } else {
                defer.resolve(allKeys);
            }
        };

        return defer.promise();
    }

    contexts = {
        getAll: function () {
            var defer = new $.Deferred();

            openingDB.done(function (db) {
                var index = db.transaction(['tasks']).objectStore('tasks').index('context');
                getAllKeys(index).then(function (keys) {
                    defer.resolve(keys);
                }, function () {
                    defer.reject();
                });
            });

            return defer.promise();
        }
    };

    tasks = {
        add: function (obj) {
            var task = dbTypes.task(obj),
                defer = new $.Deferred();

            openingDB.done(function (db) {
                var transaction, objectStore, request;

                transaction = db.transaction(['tasks'], IDBTransaction.READ_WRITE);

                objectStore = transaction.objectStore('tasks');
                request = objectStore.add(task);
                request.onsuccess = function (event) {
                    console.log('IDB: Added ' + event.target.result);
                    defer.resolve(event.target.result);
                };
                request.onerror = function () {
                    defer.reject();
                };
            });
            return defer.promise();
        },

        get:  function (query) {
            var deferred = new $.Deferred();
            openingDB.done(function (db) {
                var objectStore,
                    index,
                    result = [],
                    range;
                objectStore = db.transaction('tasks').objectStore('tasks');
                if (_.isString(query)) {
                    objectStore.get(query).onsuccess = function (event) {
                        deferred.resolve(event.target.result);
                    };
                } else if (_.isObject(query)) {
                    if (query.id) {
                        return tasks.get(query.id);
                    } else if (query.state) {
                        index = objectStore.index('state');
                        range = IDBKeyRange.only(query.state);
                        getAll(index, range).then(function (allItems) {
                            deferred.resolve(allItems);
                        }, function () { deferred.reject(); });
                    }
                } else {
                    throw new Error('query must be a String or an object.');
                }
            });
            return deferred.pipe();
        }
    };

    return {
        contexts: contexts,
        projects: projects,
        tasks: tasks
    };
});
