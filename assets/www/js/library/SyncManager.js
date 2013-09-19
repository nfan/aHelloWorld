define(['underscore', 'backbone', 'jquery',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'model/CRMTemplateCollection'
        ],
       
       function(_, Backbone, $, CRMApp, CRMStore, CRMUtil, CRMTemplateCollection) {
       
            if (typeof window.crm_syncmanager != 'undefined') {
                    return window.crm_syncmanager;
                }
                
                var SyncManager = function() {
                
                };
                
                SyncManager.getInstance = function() {
                        if(typeof window.crm_syncmanager == 'undefined') {
                            window.crm_syncmanager = SyncManager;
                            var that = window.crm_syncmanager;
                            that.initialize();
                        }
                        
                        return window.crm_syncmanager;
                };
                
                SyncManager.initialize = function() {
                    var that = SyncManager.getInstance();

                };
       
                SyncManager.syncTemplates = function(callback) {
                    var that = SyncManager.getInstance();
                    var templates = [];

                    var tmplCollection = new CRMTemplateCollection();
                    tmplCollection.on('reset', function(tmpls, options) {
                        if (typeof tmpls == 'undefined' || typeof tmpls.models == 'undefined' || tmpls.models.length == 0) {
                            return;
                        }
                        
                        templates = tmpls;
                        
                        //put in memory
                        CRMStore.putTemplates(templates.models);
                        
                        if (typeof callback == 'function') {
                            callback(templates);
                        }
                    }, that);
                    
                    tmplCollection.fetch({reset: true});
                };
       
                return SyncManager;
            
        }
);