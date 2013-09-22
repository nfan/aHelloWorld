define(['jquery', 'backbone', 'underscore',
        'view/BaseView',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'text!view/ListView.html!strip',
        'model/CRMFormDataCollection'
        ],
        function($, Backbone, _, BaseView, CRMApp, CRMStore, CRMUtil, ListViewTemplate, CRMFormDataCollection) {

    var ListView = BaseView.extend({

        cur_template_id : 0,

        events: function(){
            return _.extend({}, BaseView.prototype.events,{
                "click button.linkToView": 'linkToView',
                "click button.linkToAdd": 'linkToAdd',
                "click button.linkToEdit": 'linkToEdit',
                "click button.linkToDelete": 'linkToDelete'
            });
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

                    formDataCollection.on('reset', function() {
                        /*
                        if (typeof collection == 'undefined' || typeof collection.models == 'undefined' || typeof collection.models.length==0) {
                            return;
                        }
                        */
                        //collection.setCurTemplateId(that.cur_template_id);
                        //formDataCollection.models = collection.models;
                        if (formDataCollection.models.length==0) {
                            return;
                        }
                        CRMStore.putFormDataCollection(that.cur_template_id, formDataCollection);
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
                    
                    formDataCollection.fetch({reset:true});
        },
        
        linkToView: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    var c = $(evt.currentTarget);
 
                    var that = this;
                    
                    var cur_formdata_id = c.attr("data-formdata-id");
                    
                    CRMApp.getRouter().navigateTo("form/view/"+that.cur_template_id+"/"+cur_formdata_id);
        },
        
        linkToEdit: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var c = $(evt.currentTarget);
                    
                    var that = this;
                    
                    var cur_formdata_id = c.attr("data-formdata-id");

                    CRMApp.getRouter().navigateTo("form/edit/"+that.cur_template_id+"/"+cur_formdata_id);
        },
        
        linkToDelete: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var c = $(evt.currentTarget);
                    
                    var that = this;
                    
                    var cur_formdata_id = c.attr("data-formdata-id");

                    if (window.confirm("确认删除?")) {
                        
                        formData = CRMStore.getFormDataCollection(that.cur_template_id);
                        var model = formData.get(cur_formdata_id);
                        var xhr = model.destroy();
                        
                        if (!xhr) {
                            that.render();
                        } else {
                            xhr.done(function() {that.render();});
                        }
                        
                        
                    }
        },
        
        linkToAdd: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var that = this;

                    CRMApp.getRouter().navigateTo("form/add/"+that.cur_template_id);
        }
        
    });
    
    return ListView;
});