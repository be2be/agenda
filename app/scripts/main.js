require.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min'
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

require(['knockout', 'agenda/AppViewModel'],
function (ko, AppViewModel) {
    'use strict';
    ko.applyBindings(new AppViewModel());
});
