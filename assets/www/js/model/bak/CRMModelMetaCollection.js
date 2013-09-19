define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMModelMeta'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMModelMeta) {

        var CRMModelMetaCollection = Backbone.Collection.extend({
            model: CRMModelMeta,
            
            initialize: function(models, options) {
                this.storage = new Offline.Storage('CRMModelMetas', this);
            },
            
            url: function() {
                var config = CRMApp.getInstance();
                return CRMApp.getBaseUrl()+'/api/template/getAllModelMetas?'+CRMApp.getUrlPart();
            },
            /*
            parse: function(response) {
                return response.templates;
            },
            */
            parseBeforeLocalSave: function(response) {
                return response.modelmetas;
            }
        });
       
       return CRMModelMetaCollection;
    }
);