define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMTemplateMeta = Backbone.Model.extend({
        defaults: {
            id: '0'
        }
    });
    
    return CRMTemplateMeta;
});