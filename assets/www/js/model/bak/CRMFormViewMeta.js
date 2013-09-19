define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMFormViewMeta = Backbone.Model.extend({
        defaults: {
            id: '0'
        }
    });
    
    return CRMFormViewMeta;
});