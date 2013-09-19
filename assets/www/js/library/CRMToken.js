define(['underscore', 'backbone', 'jquery'],
       
       function(_, Backbone, $) {

            var CRMToken = function(token, ttl) {
                if (typeof token == 'undefined') {
                    token = "0";
                }
       
                if (typeof ttl == 'undefined') {
                    ttl = 30 * 24 * 3600;
                }
       
                this.token = token;
                this.token_time = (new Date()).getTime();
                this.ttl = ttl;
            }
       
            CRMToken.prototype.isExpired = function() {
                if (this.token_time - (new Date()).getTime() > this.ttl) {
                    return true;
                }
       
                return false;
            }
       
            CRMToken.prototype.isValid = function() {

                if (this.isExpired()) {
                    return false;
                }
       
                if (this.token == "0") {
                    return false;
                }
       
                return true;
            }
       
            CRMToken.prototype.getToken = function() {
              return this.token;
            }
            
            return CRMToken;
       }
);
