#!/usr/bin/env node

var restore = (function(){

    /**********************
     * Modules
     *********************/
    var fs, path, fileUtils;

    /**********************
     * Internal properties
     *********************/
    var restore, context;


    /************
     * Public API
     ************/
    restore = {
        init: function(ctx){
            context = ctx;

            console.log("DUMP: "+require('util').inspect(ctx));

            // Load modules
            fs = require('fs');
            path = require('path');
            fileUtils = require(path.join('plugins/cordova-custom-config/hooks/fileUtils.js'))(ctx);

            fileUtils.copySyncRelative('spec/android/AndroidManifest.xml', 'platforms/android/AndroidManifest.xml');
            console.log("Restored original Android platform config");
        }

    };
    return restore;
})();

module.exports = function(ctx){
    restore.init(ctx);
    return restore;
};