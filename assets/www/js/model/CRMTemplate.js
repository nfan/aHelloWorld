define(['underscore', 'backbone', 'jquery',
        'library/CRMConst'], function(_, Backbone, $, CRMConst) {

    var CRMTemplate = Backbone.Model.extend({
        defaults: {
        },
        
        getSearchableMetas: function() {
            var that = this;
            
            var ret = {};
            
            var meta_metas = $.parseJSON(this.get("meta_metas"));
            for(idName in meta_metas) {
                var meta = meta_metas[idName];
                if (meta.type == CRMConst.FIELD_INTEGER
                    || meta.type == CRMConst.FIELD_DOUBLE
                    || meta.type == CRMConst.FIELD_DATETIME
                    || meta.type == CRMConst.FIELD_FILE) {
                    continue;
                } else {
                    ret[idName] = meta;
                }
            }
            
            return ret;
        },
        
        getSortableMetas: function () {
            var that = this;
            
            var ret = {};
            
            var meta_metas = $.parseJSON(this.get("meta_metas"));
            for(idName in meta_metas) {
                var meta = meta_metas[idName];
                if (meta.type != CRMConst.FIELD_FILE) {
                    ret[idName] = meta;
                }
            }
            
            return ret;
        }
    });
    
    return CRMTemplate;
});