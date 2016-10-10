#!/usr/bin/env node

var restore = (function(){

    /**********************
     * Internal properties
     *********************/
    var restore, context;
    var fs, path, cwd;

    /************
     * Public API
     ************/
    restore = {
        init: function(ctx){
            context = ctx;

            fs = require('fs-extra');
            path = require('path');
            cwd = path.resolve();

            var source = path.join(cwd, 'spec/android/AndroidManifest.xml');
            var target = path.join(cwd, 'platforms/android/AndroidManifest.xml');
            fs.copySync(source, target);
            console.log("Restored original AndroidManifest.xml");
        }

    };
    return restore;
})();

module.exports = function(ctx){
    restore.init(ctx);
    return restore;
};