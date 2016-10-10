#!/usr/bin/env node

var xmlHelper = (function(){

    /**********************
     * Internal properties
     *********************/
    var xmlHelper;

    /************
     * Public API
     ************/
    xmlHelper = {
        assertXpathExists: function(xml, xpath, number) {
            number = number || 1;
            expect(xml.findall(xpath).length).toEqual(number);
        },
        assertXpathNotExists: function(xml, xpath) {
            expect(xml.findall(xpath).length).toEqual(0);
        }
    };
    return xmlHelper;
})();

module.exports = function(){
    return xmlHelper;
};