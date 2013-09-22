define(['underscore', 'backbone',
        'controller/BaseController',
        'library/CRMApp',
        'view/HomeView'],

function(_, Backbone, BaseController, CRMApp, HomeView) {

    var HomeController = _.extend(
        {
            index : function(parameters) {
                if (typeof this.view == 'undefined') {
                    this.view = new HomeView();
                }
               
                if (typeof parameters != 'undefined') {
                    if (parameters['action'] == 'fetchAndRender') {
                        this.fetchAndRender(parameters);
                    }
                    return;
                }
                this.view.render();
            },
            
            fetchAndRender : function(parameters) {
                this.view.fetchAndRender();
            }
        }, BaseController
    );
    return HomeController;

});