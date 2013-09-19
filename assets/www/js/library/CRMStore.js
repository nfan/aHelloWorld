define(['underscore', 'backbone', 'library/CRMToken',  'library/CRMUtil'],

function(_, Backbone, CRMToken, CRMUtil) {

    if (typeof window.crm_store != 'undefined') {
        return window.crm_store;
    }
    
    var CRMStore = function() {
    
    };
    
    CRMStore.getInstance = function() {
            if(typeof window.crm_store == 'undefined') {
                window.crm_store = CRMStore;
                var that = window.crm_store;
                that.initialize();
            }
            
            return window.crm_store;
    };
    
    CRMStore.initialize = function() {
        var that = window.crm_store;
        that.map = new Object();
       
        
    };
    
    CRMStore.get = function(key) {
        var that = window.crm_store;
        if (typeof that.map[key] != 'undefined' && that.map[key] != null) {
            return that.map[key];
        }
        return that.map[key];
    };
    
    //client memory access api
    CRMStore.put = function(key, value) {
        var that = window.crm_store;
        that.map[key] = value;
    }
    
    //client memory access api for template
    CRMStore.getTemplate = function(tid) {
        var that = window.crm_store;
        var templates = that.get("templates");
        if ( typeof templates != "undefined") {
            if (typeof templates[tid] != "undefined") {
                return templates[tid];
            }
        }
        
        return null;
    }
    
    CRMStore.getCompiledTemplate = function(tid) {
        var that = window.crm_store;
        var compiled_tpls = that.get("compiled_templates");
        if ( typeof compiled_tpls != "undefined") {
            if (typeof compiled_tpls[tid] != "undefined") {
                return compiled_tpls[tid];
            }
        }
        
        return null;
    }
    
    CRMStore.putTemplates = function(tmpl_models) {
        var that = window.crm_store;
        
        for(var i = 0; i<tmpl_models.length; i++) {
            that.putTemplate(tmpl_models[i].get("id"), tmpl_models[i]);  
        }
    }
    
    CRMStore.putTemplate = function(tid, tmpl_model) {
        var that = window.crm_store;
        
        var tmpl_models = that.get("templates");
        if ( typeof tmpl_models == "undefined") {
            tmpl_models = [];
        }
        
        if ( typeof tmpl_models != "undefined") {
                tmpl_models[tid] = tmpl_model;
                that.put("templates", tmpl_models);
                that._compileTemplate(tid);
        }

    }
    
    CRMStore._compileTemplate = function(tid) {
        var that = window.crm_store;
        var compiled_tpls = that.get("compiled_templates");
        
        if ( typeof compiled_tpls == "undefined") {
            compiled_tpls = [];
        }
        
        if ( typeof compiled_tpls != "undefined") {
                template = that.getTemplate(tid);
                var compiled_tpl = {};
                compiled_tpl.list = _.template(template.get("list_html"));
                compiled_tpl.form = _.template(template.get("form_html"));
                compiled_tpl.view = _.template(template.get("view_html"));
                
                compiled_tpls[tid] = compiled_tpl;
                that.put("compiled_templates", compiled_tpls);
                
                return compiled_tpl;
        }
        
        return null;
    }
    
    //client memory access api for formdata collection
    CRMStore.getFormDataCollection = function(tid) {
        var that = window.crm_store;
        var formDataCollections = that.get("formDataCollections");
        if ( typeof formDataCollections != "undefined") {
            if (typeof formDataCollections[tid] != "undefined") {
                return formDataCollections[tid];
            }
        }
        
        return null;
    }
    
    CRMStore.putFormDataCollection = function(tid, formDataCollection) {
        var that = window.crm_store;
        
        var formDataCollections = that.get("formDataCollections");
        if ( typeof formDataCollections == "undefined") {
            formDataCollections = [];
        }
        
        if ( typeof formDataCollections != "undefined") {
                formDataCollections[tid] = formDataCollection;
                that.put("formDataCollections", formDataCollections);
        }

    }
    
    //client persistent API
        
    CRMStore.read = function(key) {
        var ret = localStorage.getItem(key);
        if (!CRMUtil.isEmpty(ret)) {
            ret = $.parseJSON(ret);
        }
       
        return ret;
    }
    
    CRMStore.write = function(key, value) {
        if (CRMUtil.isEmpty(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    
    CRMStore.remove = function(key) {
        localStorage.removeItem(key);
    }
    
    return CRMStore.getInstance();
});