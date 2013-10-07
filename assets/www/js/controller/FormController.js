define(['underscore', 'backbone',
        'controller/BaseController',
        'library/CRMApp',
        'view/FormView'],

function(_, Backbone, BaseController, CRMApp, FormView) {

    var FormController = _.extend(
        {
            index:function(parameters) {
                if (typeof this.view == 'undefined') {
                    this.view = new FormView();
                }

                if ( parameters['action'] == 'add' ) {
                        this.add(parameters);
                } else {
                    this.view.fetchAndRender(parameters['template_id'], parameters['formdata_id'], parameters['action']);
                }
            },
            
            add: function(parameters) {
                this.view.fetchAndRender(parameters['template_id'], 0, parameters['action']);
            }
        }, BaseController
        
    );
    
    return FormController;
});