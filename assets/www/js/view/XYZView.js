define(['underscore', 'Backbone', 'jquery',
        'view/BaseView',
        'model/XYZCollection',
        'model/XYZ',
        'text!view/XYZView.html!strip'
       ],
       
       function(_, Backbone, $, BaseView, XYZCollection, XYZ, XYZViewHtml) {
       
            var XYZView = BaseView.extend({

                events: {
                    'click #navigator li a': 'showXYZ'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render');
 
		/*
                    //fetch categories, news of selected category and render
                    var that = this;
                    that.resetCategories(function() {
                        that.resetNews( function() {
                            that.render();
                        });
                    });
                    
                    this.categories.fetch({reset: true});
               	 */
                },
                
                //render basic template and this.categories/ this.news
                render: function() {
                    var html = XYZViewHtml;
                    this.$el.html(html);

		/*                    
                    //show categories on navigator 
                    _.each(this.categories.models, function(cat) {
                        
                        if (cat.get("real_id") == this.cur_category_id) {
                            $('#navigator').append('<li class="active"><a href="javascript:void(0)" data-cat-id="'+cat.get("real_id")+'">'+cat.get('title')+'</a></li>');
                        } else {
                            $('#navigator').append('<li><a href="javascript:void(0)" data-cat-id="'+cat.get("real_id")+'">'+cat.get('title')+'</a></li>');
                        }
                    });
                    
                    _.each(this.news.models, function(news) {
                        var itemView = new ItemView({model: news});
                        $('#news_list').append(itemView.render().$el);
                    });
                 */
                    return this;
                    
                }
            });
            return XYZView;
       }
);
