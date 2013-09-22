define(['underscore', 'backbone',
        'controller/BaseController',
        'library/CRMApp',
        'view/ListView'],

function(_, Backbone, BaseController, CRMApp, ListView) {

    var ListController = _.extend(    
        {
            index : function(parameters) {
                if (typeof this.view == 'undefined') {
                    this.view = new ListView();
                }

                this.view.fetchAndRender(parameters['template_id']);
            }
        }, BaseController
    );
    
    return ListController;
});