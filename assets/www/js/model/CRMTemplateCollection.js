define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMTemplate'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMTemplate) {

        var CRMTemplateCollection = Backbone.Collection.extend({
            model: CRMTemplate,
            
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
            },
            
            fakeModel : function(sid) {
				        var model;
				        model = new CRMTemplate({
				          id: sid
				        });
				        model.collection = this; 
				        return model;
			      }
        });
       
       return CRMTemplateCollection;
    }
);