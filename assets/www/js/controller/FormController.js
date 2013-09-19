define(['underscore', 'backbone',
        'controller/BaseController',
        'library/CRMApp',
        'view/FormView'],

function(_, Backbone, BaseController, CRMApp, FormView) {

    var FormController = new BaseController();
    
    FormController.prototype.index = function(parameters) {
        if (typeof this.view == 'undefined') {
            this.view = new FormView();
        }

        this.view.fetchAndRender(parameters['template_id'], parameters['formdata_id'], parameters['action']);
    };
    
    return FormController;
});