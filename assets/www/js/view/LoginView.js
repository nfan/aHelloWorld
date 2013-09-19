define(['underscore', 'backbone', 'jquery', 'bootstrap',
        'library/CRMApp',
        'library/CRMToken',
        'view/HomeView',
        'text!view/LoginView.html!strip'
       ],
       
       function(_, Backbone, $, bootstrap, CRMApp, CRMToken, HomeView, LoginViewHtml) {
       
            var LoginView = Backbone.View.extend({
                el: 'body',

                events: {
                    'click #login': 'login'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'login');
 
                },

                render: function() {
                    var html = LoginViewHtml;
                    this.$el.html(html);

                    var token = CRMApp.getToken();
                    
                    //if token valid, go to home view automatically
                    if (token.isValid()) {
                        CRMApp.getRouter().navigateTo('home/fetchAndRender');
                        return;
                    }
                            
                    return this;
                    
                },
                
                login: function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    var token = CRMApp.getToken();
                    if (token.isValid()) {
                        CRMApp.getRouter().navigateTo('home/fetchAndRender');
                        return;
                    }
                    
                    $.ajax({
                        url: CRMApp.getBaseUrl() + "/api/login",
                        type: "POST",
                        cache: false,
                        dataType: 'text',
                        data: $("#loginForm").serialize()
                        //crossDomain: true,
                        //jsonp: false,
                        //jsonpCallback: "callbackName"
                        //jsonpCallback: 'MyJSONPCallback'
                        //dataType: "text",
                        //data: $("#loginForm").serialize()
                    }).done(function(text) {
                        var ret = $.parseJSON(text);
                           
                        if (ret.errorcode == '0') {
                            var token = new CRMToken(ret.token, CRMApp.getTTL());
                            var app = CRMApp.getInstance();
                            app.setToken(token);
                            app.getRouter().navigateTo('home/fetchAndRender');
                            
                        } else {
                            alert(ret.message);
                        }
                    }).fail(function(xhr, textStatus, errorThrown) {
                        alert(textStatus+":"+errorThrown);
                    });
                    
                    return this;
                }
            });
       
            return LoginView;
       }
);
