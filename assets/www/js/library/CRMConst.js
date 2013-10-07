define(['underscore', 'backbone'], function(_, Backbone) {

    var CRMConst = {

       	FIELD_INPUT : 1,
        FIELD_INPUT_INTEGER : 2,
        FIELD_INPUT_DOUBLE : 3,
        FIELD_INPUT_DATETIME : 4,
        FIELD_SINGLE : 5,
        FIELD_SINGLE_RADIO : 6,
        FIELD_MULTIVALUE : 7,
        FIELD_TEXTAREA : 8,
        FIELD_FILE : 9,
        PER_PAGE: 10
    };
    
    return CRMConst;
});