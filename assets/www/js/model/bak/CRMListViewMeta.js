define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMListViewMeta = Backbone.Model.extend({
        defaults: {
            id: '0'
        }
    });
    
    return CRMListViewMeta;
});