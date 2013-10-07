define(['underscore', 'backbone', 'jquery', 'view/BaseView',
        'bootstrap',
        'library/CRMApp',
        'library/CRMConst',
        'text!view/PaginationSubView.html!strip'
       ],
       
       function(_, Backbone, $, BaseView, bootstrap, CRMApp, CRMConst, PaginationSubViewHtml) {
       
            var PaginationSubView = Backbone.View.extend({
                el: ".htmlToPagination",
                
                template: _.template(PaginationSubViewHtml),
                
                offset: 0,
                count: 0,
                
                initialize: function(options) {
                    _.bindAll(this, 'render');
                    this.offset = options.offset;
                    this.count = options.count;
                },

                render: function() {
                    var that = this;
                    
                    var pagination = {};
                    if (Math.floor( that.count / CRMConst.PER_PAGE) * CRMConst.PER_PAGE < that.count) {
                        pagination.pages = Math.floor(that.count / CRMConst.PER_PAGE) + 1;
                    } else {
                        pagination.pages = Math.floor(that.count / CRMConst.PER_PAGE);
                    }
                    
                    
                    pagination.cur_page = Math.floor(that.offset / CRMConst.PER_PAGE);
                    
                    pagination.first_page = 0;
                    pagination.last_page = pagination.pages - 1;
                    pagination.pre_page = (pagination.cur_page>0)?pagination.cur_page-1:pagination.cur_page;
                    pagination.next_page = (pagination.cur_page<pagination.last_page)?pagination.cur_page+1:pagination.last_page;
                    
                    $(that.el).html(that.template({pagination: pagination}));
                    
                    return this;
                    
                }
            });
       
            return PaginationSubView;
       }
);
