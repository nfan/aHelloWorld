define(['underscore', 'backbone', 'library/CRMToken'],

function(_, Backbone, CRMToken) {

    if (typeof window.crm_util != 'undefined') {
        return window.crm_util;
    }
    
    var CRMUtil = function() {
    
    };
    
    CRMUtil.getInstance = function() {
            if(typeof window.crm_util == 'undefined') {
                window.crm_util = CRMUtil;
                var that = window.crm_util;
                that.initialize();
            }
            
            return window.crm_util;
    };
    
    CRMUtil.initialize = function() {
        var that = CRMUtil.getInstance();

    };
    
    CRMUtil.isEmpty = function (mixed_var) {
       // Checks if the argument variable is empty
       // undefined, null, false, number 0, empty string,
       // string "0", objects without properties and empty arrays
       // are considered empty
       
       var undef, key, i, len;
       var emptyValues = [undef, null, false, 0, "", "0"];
       
       for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixed_var === emptyValues[i]) {
            return true;
        }
       }
       
       if (typeof mixed_var === "object") {
        for (key in mixed_var) {

            return false;
        }
        return true;
       }
       
       return false;
    }

    return CRMUtil.getInstance();
});