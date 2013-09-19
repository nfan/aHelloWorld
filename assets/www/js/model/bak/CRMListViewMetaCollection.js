define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMListViewMeta'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMListViewMeta) {

        var CRMListViewMetaCollection = Backbone.Collection.extend({
            model: CRMListViewMeta,
            
            initialize: function(models, options) {
                this.storage = new Offline.Storage('CRMListViewMeta', this);
            },
            
            url: function() {
                var config = CRMApp.getInstance();
                return CRMApp.getBaseUrl()+'/api/template/getAllListViewMetas?'+CRMApp.getUrlPart();
            },
            /*
            parse: function(response) {
                return response.templates;
            },
            */
            parseBeforeLocalSave: function(response) {
                return response.listmetas;
            }
        });
       
       return CRMListViewMetaCollection;
    }
);