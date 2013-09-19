define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMModelMeta = Backbone.Model.extend({
        defaults: {
            id: '0'
        }
    });
    
    return CRMModelMeta;
});