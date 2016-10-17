#!/usr/bin/env node

var restore = (function(){

    /**********************
     * Modules
     *********************/
    var fs, path, fileUtils;

    /**********************
     * Constants
     *********************/

    /**********************
     * Internal properties
     *********************/
    var restore, context, projectName;


    /**********************
     * Internal functions
     *********************/

    /************
     * Public API
     ************/
    restore = {
        init: function(ctx){
            context = ctx;

            console.log("Restoring original iOS platform config");

            // Load modules
            fs = require('fs');
            path = require('path');
            try{
                fileUtils = require(path.resolve('plugins/cordova-custom-config/hooks/fileUtils.js'))(ctx);
            }catch(e){
                return console.warn("Aborting restore of original iOS platform config - cordova-custom-config plugin not installed yet");
            }
            projectName = fileUtils.getProjectName();

            fileUtils.copySync('spec/ios/'+projectName+'-Info.plist', 'platforms/ios/'+projectName+'/'+projectName+'-Info.plist');
            fileUtils.copySync('spec/ios/project.pbxproj', 'platforms/ios/'+projectName+'.xcodeproj/project.pbxproj');
            fileUtils.copySync('spec/ios/build.xcconfig', 'platforms/ios/cordova/build.xcconfig');
            fileUtils.copySync('spec/ios/build-debug.xcconfig', 'platforms/ios/cordova/build-debug.xcconfig');
            fileUtils.copySync('spec/ios/build-extras.xcconfig', 'platforms/ios/cordova/build-extras.xcconfig');
            fileUtils.copySync('spec/ios/build-release.xcconfig', 'platforms/ios/cordova/build-release.xcconfig');
            console.log("Restored original iOS platform config");
        }

    };
    return restore;
})();

module.exports = function(ctx){
    restore.init(ctx);
    return restore;
};