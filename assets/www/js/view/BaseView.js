define(['underscore', 'backbone', 'jquery', 'library/CRMApp'],
       
       function(_, Backbone, $, CRMApp) {
       
            var BaseView = Backbone.View.extend({
                el: 'body',

                events: {
                    "click a.linkToHome": 'linkToHome'
                },
                
                linkToHome: function(evt) {
                    
                    CRMApp.getRouter().navigateTo("home/fetchAndRender");
                }
            });
            return BaseView;
       }
);
