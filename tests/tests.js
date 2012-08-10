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

require(['domReady!'],
function () {
    'use strict';
    QUnit.start();
    QUnit.log = function(obj) {
        if (window.console && window.console.log && obj.result === false) {
          window.console.log(obj.result +' :: '+ obj.message);
        }
    };
});
