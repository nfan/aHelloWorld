define(['jquery', 'backbone', 'underscore',
        'view/BaseView',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'library/CRMConst',
        'text!view/ListView.html!strip',
        'model/CRMFormDataCollection',
        'view/PaginationSubView'
        ],
        function($, Backbone, _, BaseView, CRMApp, CRMStore, CRMUtil, CRMConst, ListViewTemplate, CRMFormDataCollection, PaginationSubView) {

    var ListView = BaseView.extend({

        cur_template_id : 0,
        q: "",
        s: "",
        offset: 0,
        count: 0,
        
        events: function(){
            return _.extend({}, BaseView.prototype.events,{
                "click button.linkToView": 'linkToView',
                "click button.linkToAdd": 'linkToAdd',
                "click button.linkToEdit": 'linkToEdit',
                "click button.linkToDelete": 'linkToDelete',
                "click button.linkToSearch": 'linkToSearch',
                "change select.linkToSort": 'linkToSort',
                "click button.linkToPage": "linkToPage"
            });
        },
        
        initialize: function() {
            _.bindAll(this, 'render', 'resetFormData', 'fetchAndRender');
        },
         
        render: function() {
            var that = this;
            
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
            
                var models = formData.models;
                if (!CRMUtil.isEmpty(that.q)) {
                    
                    models = formData.filter(function(mdl) {
                        var searchMetas = template.getSearchableMetas();
                        for(idName in searchMetas) {
                            if ( !CRMUtil.isEmpty(mdl.get(idName)) ) {
                                if ( mdl.get(idName).indexOf(that.q) >= 0 ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    });
                }
                
                //to implement asc and desc, need reference to
                //http://stackoverflow.com/questions/5636812/sorting-strings-in-reverse-order-with-backbone-js
                
                if (!CRMUtil.isEmpty(that.s)) {
                    models = _.sortBy(models, function(mdl) {
                        return mdl.get(that.s);
                    });
                }
                
                that.count = models.length;
                
                if (!CRMUtil.isEmpty(that.offset)) {
                    models = _.last(models, that.offset);
                    models = _.first(models, CRMConst.PER_PAGE);
                } else {
                    models = _.first(models, CRMConst.PER_PAGE);
                }
                
                html = compiled_template.list({template: template, formdatas: models});
            }
            
            html = ListViewTemplate.replace("<!--content_tag-->", html);
            this.$el.html(html);
            
            this.postRender(template, formData);
            
            return this;
        },
        
        /* render search, sort, pagination*/
        postRender: function(template, formData) {
            var that = this;
            
            $("#inputToSearch").val(this.q);
            
            $("#linkToSort").empty();
            $("#divToPagination").empty();
            
            if (!CRMUtil.isEmpty(template)) {
                var sortables = template.getSortableMetas();
                var selectOptions = '<option value="">排序</option>';
                for(m in sortables) {
                    if (m == that.s) {
                        selectOptions += '<option value="'+sortables[m].id_name+'" selected="selected">'+sortables[m].name+'</option>';
                    } else {
                        selectOptions += '<option value="'+sortables[m].id_name+'">'+sortables[m].name+'</option>';
                    }
                    
                }
                $("#linkToSort").append(selectOptions);
                
                var pagination = new PaginationSubView({offset: that.offset, count: that.count});
                pagination.render();
            }
            
            
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
        },
        
        linkToSearch: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var that = this;
                    
                    var id = evt.target.id;

                    that.q = $("#inputToSearch").val();

                    that.render();
                    
        },
        
        linkToSort: function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var that = this;
                    
                    var id = evt.target.id;

                    that.s = $('#'+id).val();

                    that.render();
        },
        
                        
        linkToPage: function(evt) {
                    var that = this;
                    var gotoPage = $(evt.target).attr("data-page");
                    that.offset = parseInt(gotoPage) * CRMConst.PER_PAGE;
                    
                    that.render();
        }
        
    });
    
    return ListView;
});