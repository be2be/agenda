/*jshint browser:true */
/*global QUnit */
require.config({
    baseUrl: '../app/scripts/',
    paths: {
        tests: '../../tests/tests/'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['tests/model/model', 'tests/model/dbTypes', 'domReady!'],
function () {
    'use strict';
    QUnit.start();
});
