/*jshint browser: true, devel: true */
/*global IDBKeyRange, IDBTransaction */
define(['./dbTypes', 'underscore'], function (dbTypes, _) {
    'use strict';

    var db, tasks, projects,
        idbopen = false;

    window.indexedDB = window.indexedDB || window.mozIndexedDB;

    function openDB(callback) {
        var request;
        request = window.indexedDB.open('agenda', 1);
        request.addEventListener('error', function() { console.log("addListener");});

        request.onerror = function (event) {
            console.warn('Database agenda could not be opened.');
        };

        request.onupgradeneeded = function (event) {
            var db, taskStore;
            db = event.target.result;

            console.log("Create ObjectStore for tasks.");
            taskStore = db.createObjectStore('tasks', { keyPath: 'id' });

            taskStore.createIndex('state', 'state', { unique: false });
            taskStore.createIndex('project', 'project', { unique: false});
        };

        request.onsuccess = function (event) {
            db = request.result;
            idbopen = true;
            console.log('Database "agenda" succesfully opened.');
            if (_.isFunction(callback)) {
                callback();
            }
        };
    }

    function onidbopen(callback) {
        if (idbopen) {
            callback();
        } else {
            openDB(callback);
        }
    }

    tasks = {
        add: function (obj, callback) {
            var task = dbTypes.task(obj);

            onidbopen(function() {
                var transaction, objectStore, request;

                transaction = db.transaction(['tasks'], IDBTransaction.READ_WRITE);

                objectStore = transaction.objectStore('tasks');
                request = objectStore.add(task);
                request.onsuccess = function (event) {
                    console.log('IDB: Added ' + event.target.result);
                    if (_.isFunction(callback)) {
                        callback.call(this, event.target.result);
                    }
                };
            });
        },

        get:  function (query, callback) {
            onidbopen(function() {
                var objectStore,
                    index,
                    result = [],
                    range;
                objectStore = db.transaction('tasks').objectStore('tasks');
                if (_.isString(query)) {
                    objectStore.get(query).onsuccess = function(event) {
                        callback.call(this, event.target.result);
                    };
                } else if (_.isObject(query)) {
                    if (query.id) {
                        tasks.get(query.id, callback);
                    } else if (query.state) {
                        index = objectStore.index('state');
                        range = IDBKeyRange.only(query.state);
                        index.openCursor(range).onsuccess = function(event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                result.push(cursor.value);
                                cursor.continue();
                            } else {
                                callback.call(this, result);
                            }
                        };
                    }
                } else {
                    throw new Error('query must be a String or an object.');
                }
            });
        }
    };

    openDB();

    return {
        openDB: openDB,
        projects: projects,
        tasks: tasks
    };
});
