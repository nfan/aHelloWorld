define(['underscore', 'backbone',
        'library/CRMApp'], 
        function(_, Backbone, CRMApp) {

    var CRMFormData = Backbone.Model.extend({
        defaults: {
        },
        url: function() {
                return CRMApp.getBaseUrl()+'/api/formdata/' + this.id + "?" + CRMApp.getUrlPart() + "&key__templateid=" + this.collection.getCurTemplateId();
        }
    });
    
    return CRMFormData;
});