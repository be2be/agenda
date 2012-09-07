require.config({
    baseUrl: 'scripts/',
    paths: {
    },
    map: {
        '*': {
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['knockout', 'agenda/AppViewModel', 'bootstrap'],
function (ko, AppViewModel) {
    'use strict';
    ko.applyBindings(new AppViewModel());
});
