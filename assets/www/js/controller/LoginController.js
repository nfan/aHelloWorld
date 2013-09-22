define(['underscore', 'backbone',
        'controller/BaseController',
        'library/CRMApp',
        'view/LoginView'],

function(_, Backbone, BaseController, CRMApp, LoginView) {

    var LoginController = _.extend(
        {
           index : function(parameters) {
                if (typeof this.view == 'undefined') {
                    this.view = new LoginView();
                }
               
                this.view.render();
            }
        }, BaseController
    );
    return LoginController;
});