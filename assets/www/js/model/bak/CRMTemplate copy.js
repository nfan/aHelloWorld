define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMTemplate = Backbone.Model.extend({
        defaults: {
            id: '0'
        }
    });
    
    return CRMTemplate;
});