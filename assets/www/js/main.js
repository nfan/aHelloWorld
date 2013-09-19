require.config({
	baseUrl: 'js',
	paths: {
        'jquery': 'libs/jquery/jquery-1.10.1',
		'jqueryMobile': 'libs/jquery/jquery.mobile-1.3.1',
		'underscore': 'libs/underscore/underscore',
		'backbone': 'libs/backbone/backbone',
        'backbone.offline': 'libs/backbone/backbone_offline',
        //'backbone.localStorage': 'libs/backbone/backbone.localStorage',
		'json': 'libs/json/json2',
		'domReady': 'libs/require/domReady',
        'text': 'libs/require/text',
        'bootstrap': 'libs/bootstrap/bootstrap'
	},
	shim: {
		backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        'backbone.offline': {
            deps: ['underscore', 'backbone'],
            exports: 'Offline'
        },
        /*
        BackboneLocalStorage: {
            deps:['Backbone'],
            exports:'Backbone'
        },*/
        underscore:{
            exports:'_'
        },
        bootstrap: {
            deps:['jquery']
        }
    }
});

require(['backbone', 'jquery', 'domReady'],
        function(Backbone, $, domReady) {
        
                function launchApp() {
        
                    //UPGRADE: var upgrador = new app_upgrade();
                    //UPGRADE: upgrador.check(upgraded);
                    require(['library/CRMApp', 'library/ControllerRegister'], function(CRMApp, ControllerRegister) {
                        var app = CRMApp.getInstance();
                        ControllerRegister.getInstance();
                        app.getRouter().navigateTo('index');
                    });
                }
        
                /*UPGRADE:
                function upgraded(urls) {
                    console.log("==upgraded(version, urls): "+window.my_config.version+", "+JSON.stringify(urls));
                    //UPGRADE: find someway to use new version
                }
                */
        
                domReady(function() {

                         if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                            document.addEventListener("deviceready", launchApp, false);
                         } else {
                            launchApp(); //this is the browser
                         }
                });
        }
);
