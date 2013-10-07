define(['jquery', 'backbone', 'underscore',
        'view/BaseView',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'text!view/FormView.html!strip',
        'model/CRMFormData'
        ],
        function($, Backbone, _, BaseView, CRMApp, CRMStore, CRMUtil, FormViewTemplate, CRMFormData) {

    var FormView = BaseView.extend({

        cur_template_id : 0,
        cur_formdata_id : 0,
        state: 'view',
        
        events: function(){
              return _.extend({}, BaseView.prototype.events,{
                    "click a.linkToList": 'linkToList',
                    "click a.linkToEdit": 'linkToEdit',
                    "click button.submit": 'submit'
              });
           },

        initialize: function() {
            _.bindAll(this, 'render', 'resetFormData', 'fetchAndRender');
            this.c_date = new Date();
        },
         
        render: function() {
            var that = this;

            var html = "";
            
            var compiled_template = null;
            
            if (!CRMUtil.isEmpty(this.cur_template_id)) {
              compiled_template = CRMStore.getCompiledTemplate(this.cur_template_id);
              template = CRMStore.getTemplate(this.cur_template_id);
            }
            
            if (!CRMUtil.isEmpty(compiled_template) && !CRMUtil.isEmpty(template)) {
                if (that.state == 'edit' || that.state == 'add') {
                    html = compiled_template.form({template: template, formdata:that.formdata});
                } else {
                    html = compiled_template.view({template: template, formdata:that.formdata});
                }
                
            }
            
            html = FormViewTemplate.replace("<!--content_tag-->", html);
            this.$el.html(html);
            return that;
        },
        
        fetchAndRender: function(template_id, formdata_id, state) {
                    var that = this;
                    
                    that.cur_template_id = template_id;
                    that.cur_formdata_id = formdata_id;
                    that.state = state;
                    
                    that.resetFormData(function() {
                        that.render();
                    });     
        },
        
        resetFormData: function(callback) {
                    var that = this;

                    var formDataCollection = CRMStore.getFormDataCollection(that.cur_template_id);
                    
                    if (that.cur_formdata_id == 0) {
                        /*var newObj = new CRMFormData({collection: formDataCollection});
                        formDataCollection.add(newObj);
                        that.formdata = newObj;*/
                        that.formdata = new CRMFormData();
                        
                    } else {
                    
                        that.formdata = formDataCollection.get(that.cur_formdata_id);
                    }
                    if (typeof callback == 'function') {
                      callback();
                    }
        },
        
        linkToList: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var that = this;

                    CRMApp.getRouter().navigateTo("list/"+that.cur_template_id);
        },
        
        linkToEdit: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var that = this;

                    CRMApp.getRouter().navigateTo("form/edit/"+that.cur_template_id+"/"+that.cur_formdata_id);
        },
        
        submit: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    var that = this;
                    
                    var formDataCollection = CRMStore.getFormDataCollection(that.cur_template_id);
                    
                    
                    if (that.state == 'add') {
                        var newObj = {};
                        
                        $("#formdata input").each(function(i, item){
                            newObj[$(this).attr("name")] = $(this).val();  
                        });
                        
                        formDataCollection.create(newObj, {error: function() {
                            alert('failed!');
                        },
                        success: function (model, resp) {
                            that.formdata = model;
                            alert('saved!');
                        }});
                        
                        //that.formdata = newObj;
                        
                    } else if (that.state == 'edit') {
                        $("#formdata input").each(function(i, item){
                            that.formdata.set($(this).attr("name"), $(this).val());  
                        });
                        
                        that.formdata.save(null, {error: function() {
                            alert('failed!');
                        },
                        success: function () {
                            
                            alert('saved!');
                        }});
                    }
        }
    });
    
    return FormView;
});