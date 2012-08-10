/*jshint browser:true */
/*global QUnit */
require.config({
    baseUrl: '../app/scripts/',
    paths: {
        jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min',
        tests: '../../tests/tests/'
    },
    map: {
        '*': {
            'knockout': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.1.0/knockout-min.js'
        }
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
