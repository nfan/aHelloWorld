define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMFormViewMeta'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMFormViewMeta) {

        var CRMFormViewMetaCollection = Backbone.Collection.extend({
            model: CRMFormViewMeta,
            
            initialize: function(models, options) {
                this.storage = new Offline.Storage('CRMTemplate', this);
            },
            
            url: function() {
                var config = CRMApp.getInstance();
                return CRMApp.getBaseUrl()+'/api/template/getAllFormViewMetas?'+CRMApp.getUrlPart();
            },
            /*
            parse: function(response) {
                return response.templates;
            },
            */
            parseBeforeLocalSave: function(response) {
                return response.formmetas;
            }
        });
       
       return CRMFormViewMetaCollection;
    }
);