define(['underscore', 'backbone', 'jquery',
        'library/CRMApp',
        'library/CRMStore',
        'library/CRMUtil',
        'model/CRMTemplateCollection',
        'model/CRMTemplate',
        'text!view/HomeView.html!strip',
        'library/SyncManager'
       ],
       
       function(_, Backbone, $, CRMApp, CRMStore, CRMUtil, CRMTemplateCollection, CRMTemplate, TemplateViewHtml, SyncManager) {
       
            var HomeView = Backbone.View.extend({
                el: 'body',
                
                templates: {},
                
                cur_template_id: 0,
                
                events: {
                    'click #list a': 'selectTemplate'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'fetchAndRender', 'reFetchTemplates', 'selectTemplate');
                    
                },
                
                //render basic template
                render: function() {
                    //reset blank template
                    var html = TemplateViewHtml;
                    this.$el.html(html);

                    //show templates on navigator
                    var colors = ['b-red', 'b-purple', 'b-lblue', 'b-orange', 'b-green', 'b-blue'];
                    var i = 1;
                    var that = this;
                    _.each(this.templates.models, function(tpl) {
                        //if tpl.get("id") == that.cur_template_id
                        //$('#list').append('<a href="javascript:void(0);" data-template-id="'+tpl.get("id")+'"><div class="starmite-fourth my-tile my-tile-'+i+'">'+tpl.get("name")+'</div></a>');
                        $('#list').append('<div class="span4"><div class="f-block '+colors[i%6]+'" style="display:block;"><a href="javascript:void(0);" data-template-id="'+tpl.get("id")+'"><i class="icon-briefcase"></i></a><a href="javascript:void(0);"><h4>'+tpl.get("name")+'</h4></a><p>'+tpl.get("description")+'</p></div></div>');
                        i++;
                    });
                    
                    return this;
                    
                },
                
                fetchAndRender: function() {
                    var that = this;
                    that.reFetchTemplates(function() {
                        that.render();
                    });
                    
                    
                },
                
                reFetchTemplates: function(callback) {
                    var that = this;
                    
                    SyncManager.syncTemplates(function(templates) {
                        if (typeof templates == 'undefined' || typeof templates.models == 'undefined' || templates.models.length == 0) {
                            return;
                        }
                    
                        //reset templates
                        that.templates = templates;
                        
                        //locate current id, set to first if not found
                        var found_cur_id = that.templates.models[0].get("id");
                        _.each(that.templates.models, function(tpl) {
                            if (tpl.get("id") == that.cur_template_id) {
                                found_cur_id = this.cur_template_id;
                            }
                        });
                    
                        if (found_cur_id != this.cur_template_id) {
                            that.cur_template_id = found_cur_id;
                        }
                        
                        if (typeof callback == 'function') {
                            callback();
                        }
                    });
                    

                },
                
                selectTemplate: function(evt) {
                    var c = $(evt.currentTarget);
 
                    var that = this;
                    
                    this.cur_template_id = c.attr("data-template-id");
                    console.log("template id:" + this.cur_template_id);
                    
                    if ( !CRMUtil.isEmpty(this.cur_template_id) ) {
                        CRMApp.getRouter().navigateTo("list/"+this.cur_template_id);
                        return;
                    }
                    this.render();
                }
            });
       
            return HomeView;
       }
);
