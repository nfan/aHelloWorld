define(['underscore', 'backbone',
        'backbone.offline',
        'library/CRMApp',
        'model/CRMFormData'
        ],
       
    function(_, Backbone, Offline, CRMApp, CRMFormData) {

        var CRMFormDataCollection = Backbone.Collection.extend({
            model: CRMFormData,
            cur_template_id: 0,
            initialize: function(models, options) {
                
                _.bindAll(this, 'setCurTemplateId', 'url');
            },
            setCurTemplateId: function(cur_template_id) {
                this.cur_template_id = cur_template_id;
                this.storage = new Offline.Storage('CRMFormData'+cur_template_id, this, {autoPush: true});
            },
            getCurTemplateId: function() {
                return this.cur_template_id;
            },
            url: function() {
                var config = CRMApp.getInstance();
                return CRMApp.getBaseUrl()+'/api/formdata?key__templateid='+this.cur_template_id+"&"+CRMApp.getUrlPart();
            },
            /*
            parse: function(response) {
                return response.FormDatas;
            },
            */
            parseBeforeLocalSave: function(response) {
                return response.formdata;
            }
        });
       
       return CRMFormDataCollection;
    }
);