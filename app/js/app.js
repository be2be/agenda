require.config({
    baseUrl: 'lib',
    paths: {
        agenda: '../js'
    },
    map: {
        '*': {
            'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js',
            'knockout': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.1.0/knockout-min.js'
        }
    },
    shim: {
        'bootstrap/js/bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['domReady!'],
    function () {
    }
)
