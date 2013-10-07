define(['underscore', 'backbone', 'library/CRMToken', 'library/CRMStore', 'library/CRMUtil'],

function(_, Backbone, CRMToken, CRMStore, CRMUtil) {

    var DEFAULT_TTL = 30 * 24 * 3600;
    
    if (typeof window.crm_app != 'undefined') {
        return window.crm_app;
    }
    
    var CRMApp = function() {
    
    };
    
    var CRMRouter = Backbone.Router.extend({
            routes: {
                "index":            "login",
                "login":            "login",
                "home/:action":     "home",
                "list/:tmpl_id":    "list",
                "form/:action/:tmpl_id":    "form",
                "form/:action/:tmpl_id/:formdata_id":    "form"
                //more routes
            },
            
            initialize: function() {
                _.bindAll(this, 'navigateTo', 'login', 'home', 'list', 'form');
            },
            
            navigateTo: function(hash) {
                //trick from https://github.com/jashkenas/backbone/issues/652
                if (Backbone.history.fragment === hash) {
                    Backbone.history.loadUrl(hash);
                } else {
                    this.navigate(hash, {trigger: true});
                }
            },
            
            login: function() {
                var app = CRMApp.getInstance();
                app.trigger('login');
            },
            
            home: function(action) {
                var app = CRMApp.getInstance()
                app.trigger('home', {"action":action});
            },
            
            list: function(template_id) {
                var app = CRMApp.getInstance()
                app.trigger('list', {"template_id": template_id});
            },
            
            form: function(action, template_id, formdata_id) {
                var app = CRMApp.getInstance()
                app.trigger('form', {"action": action, "template_id": template_id, "formdata_id": formdata_id});
            }
            //more routes
    });


    CRMApp.getInstance = function() {
            if(typeof window.crm_app == 'undefined') {
                window.crm_app = CRMApp;
                var that = window.crm_app;
                that.initialize();
            }
            
            return window.crm_app;
    };
    
    CRMApp.initialize = function() {
        Backbone.history.start();

        var that = CRMApp.getInstance();
        
        that.base_url = "http://fannan.co";
        that.version = "0.0";
        var token = that.getToken();
        if (CRMUtil.isEmpty(token)) {
        	token = new CRMToken("0");
      	} 
      	
      	that.token = token;
        that.router = new CRMRouter();
        that.controllers = [];
    };
    
    
    CRMApp.getRouter = function() {
        return CRMApp.router;
    };
    
    
    CRMApp.getBaseUrl = function() {
        return CRMApp.base_url;
    };
    
    CRMApp.getUrlPart = function() {
        return "token="+CRMApp.token.getToken();
    };
    
    CRMApp.getToken = function() {
        if (CRMUtil.isEmpty(CRMApp.token)) {
            var token = CRMStore.read('CRMToken');
       
            if (!CRMUtil.isEmpty(token)) {
            		var t = new CRMToken(token.token, token.ttl);
                CRMApp.token = t;
            } else {
            		CRMApp.token = new CRMToken(0);
            }
        }
        return CRMApp.token;
    };
    
    CRMApp.setToken = function(token) {
        CRMStore.write('CRMToken', token);
        CRMApp.token = token;
    };
    
    CRMApp.getTTL = function() {
        return DEFAULT_TTL;
    };

    
    CRMApp.registerController = function(controller) {
        CRMApp.controllers.push(controller);
        controller.registered();
    }
    
    return CRMApp.getInstance();
});