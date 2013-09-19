define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMTemplateMeta'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMTemplateMeta) {

        var CRMTemplateMetaCollection = Backbone.Collection.extend({
            model: CRMTemplateMeta,
            
            initialize: function(models, options) {
                this.storage = new Offline.Storage('CRMTemplate', this);
            },
            
            url: function() {
                var config = CRMApp.getInstance();
                return CRMApp.getBaseUrl()+'/api/template/getAllTemplateMetas?'+CRMApp.getUrlPart();
            },
            /*
            parse: function(response) {
                return response.templates;
            },
            */
            parseBeforeLocalSave: function(response) {
                return response.templates;
            }
        });
       
       return CRMTemplateMetaCollection;
    }
);