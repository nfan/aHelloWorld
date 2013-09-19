define(['jquery', 'backbone', 'underscore',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'text!view/ListView.html!strip',
        'model/CRMFormDataCollection'
        ],
        function($, Backbone, _, CRMApp, CRMStore, CRMUtil, ListViewTemplate, CRMFormDataCollection) {

    var ListView = Backbone.View.extend({
        el:'body',
        cur_template_id : 0,
        
        events: {
            "click button.linkToForm": 'linkToForm',
            "click a.linkToHome": 'linkToHome'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'resetFormData', 'fetchAndRender');
        },
         
        render: function() {
            var html = "";
            
            var compiled_template = null;
            var template = null;
            var formData = [];
            
            if (!CRMUtil.isEmpty(this.cur_template_id)) {
              compiled_template = CRMStore.getCompiledTemplate(this.cur_template_id);
              template = CRMStore.getTemplate(this.cur_template_id);
              formData = CRMStore.getFormDataCollection(this.cur_template_id);
            }
            
            if (!CRMUtil.isEmpty(compiled_template) && !CRMUtil.isEmpty(template) && !CRMUtil.isEmpty(formData)) {
                html = compiled_template.list({template: template, formdatas:formData.models});
            }
            
            html = ListViewTemplate.replace("<!--content_tag-->", html);
            this.$el.html(html);
            return this;
        },
        
        fetchAndRender: function(template_id) {
                    var that = this;
                    
                    that.cur_template_id = template_id;
                    
                    that.resetFormData(function() {
                        that.render();
                    });     
        },
        
        resetFormData: function(callback) {
                    var that = this;

                    var formDataCollection = new CRMFormDataCollection();
                    template = CRMStore.getTemplate(this.cur_template_id);
                    formDataCollection.setCurTemplateId(template.get("sid"));

                    formDataCollection.on('reset', function(collection, options) {
                        if (typeof collection == 'undefined' || typeof collection.models == 'undefined' || typeof collection.models.length==0) {
                            return;
                        }
                        //collection.setCurTemplateId(that.cur_template_id);
                        formDataCollection.models = collection.models;
                        CRMStore.putFormDataCollection(that.cur_template_id, collection);
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
                    
                    formDataCollection.fetch({reset:true});
        },
        
        linkToForm: function(evt) {
                    var c = $(evt.currentTarget);
 
                    var that = this;
                    
                    var cur_formdata_id = c.attr("data-formdata-id");
                    
                    CRMApp.getRouter().navigateTo("form/view/"+that.cur_template_id+"/"+cur_formdata_id);
        },
        
        linkToHome: function(evt) {
                    
                    CRMApp.getRouter().navigateTo("home/fetchAndRender");
        }
    });
    
    return ListView;
});