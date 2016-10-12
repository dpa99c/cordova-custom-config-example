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

            console.log("Restoring original Android platform config");

            // Load modules
            fs = require('fs');
            path = require('path');
            try{
                fileUtils = require(path.resolve('plugins/cordova-custom-config/hooks/fileUtils.js'))(ctx);
            }catch(e){
                return console.warn("Aborting restore of original Android platform config - cordova-custom-config plugin not installed yet");
            }

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