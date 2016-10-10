#!/usr/bin/env node

var restore = (function(){

    /**********************
     * Internal properties
     *********************/
    var restore, context;
    var fs, path, cwd;

    var copySync = function (sourcePath, targetPath){
        var contents = fs.readFileSync(sourcePath);
        fs.writeFileSync(targetPath, contents);
    };

    /************
     * Public API
     ************/
    restore = {
        init: function(ctx){
            context = ctx;

            fs = require('fs');
            path = require('path');
            cwd = path.resolve();

            var source = path.join(cwd, 'spec/android/AndroidManifest.xml');
            var target = path.join(cwd, 'platforms/android/AndroidManifest.xml');
            copySync(source, target);
            console.log("Restored original AndroidManifest.xml");
        }

    };
    return restore;
})();

module.exports = function(ctx){
    restore.init(ctx);
    return restore;
};