require.config({
    baseUrl: 'scripts/',
    paths: {
        'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js'
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

require([], function () {
});
