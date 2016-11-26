#!/usr/bin/env node

var fileHelper = (function(){

    /**********************
     * Internal properties
     *********************/
    var fileHelper;

    var fs = require('fs');
    var path = require('path');
    var et = require('elementtree');
    var exec = require('child_process').exec;

    var fileUtils;

    function init(){
        try{
            fileUtils = require(path.resolve('plugins/cordova-custom-config/hooks/fileUtils.js'))(fileHelper.getFakeCordovaContext());
        }catch(e){
            return console.error("cordova-custom-config plugin not found");
        }
    }

    /************
     * Public API
     ************/
    fileHelper = {
        parseElementtreeSync: function(filepath){
            var contents = fs.readFileSync(filepath, 'utf-8');
            if(contents) {
                contents = contents.substring(contents.indexOf('<'));
            }
            return new et.ElementTree(et.XML(contents));
        },
        fileExists: function(filepath){
            var exists;
            try {
                fs.accessSync(filepath, fs.F_OK);
                exists = true;
            } catch (e) {
                exists = false;
            }
            return exists;
        },
        getFakeCordovaContext: function(){
            return {
                hook: 'jasmine',
                opts: {
                    platforms: ['android', 'ios'],
                    options: {argv: []},
                    verbose: true,
                    silent: false,
                    browserify: false,
                    fetch: false,
                    nohooks: [],
                    searchpath: undefined,
                    save: false,
                    projectRoot: path.resolve(),
                    cordova: {platforms: {}, plugins: {}, version: '6.3.1'},
                    plugin: undefined
                },
                cmdLine: '--debug --verbose'
            };
        },
        runCordova: function(args, onFinish){
            args = args || '';
            var command = "cordova " + args;
            exec(command, function(err, stdout, stderr) {
                onFinish(err, stdout, stderr);
            });
        },
        restoreOriginalAndroidConfig: function(){
            fileUtils.copySyncRelative('spec/android/AndroidManifest.xml', 'platforms/android/AndroidManifest.xml');
            console.log("Restored original Android platform config");
        },
        restoreOriginaliOSConfig: function(){
            var projectName = fileUtils.getProjectName();

            fileUtils.copySync('spec/ios/'+projectName+'-Info.plist', 'platforms/ios/'+projectName+'/'+projectName+'-Info.plist');
            fileUtils.copySync('spec/ios/project.pbxproj', 'platforms/ios/'+projectName+'.xcodeproj/project.pbxproj');
            fileUtils.copySync('spec/ios/build.xcconfig', 'platforms/ios/cordova/build.xcconfig');
            fileUtils.copySync('spec/ios/build-debug.xcconfig', 'platforms/ios/cordova/build-debug.xcconfig');
            fileUtils.copySync('spec/ios/build-extras.xcconfig', 'platforms/ios/cordova/build-extras.xcconfig');
            fileUtils.copySync('spec/ios/build-release.xcconfig', 'platforms/ios/cordova/build-release.xcconfig');
            console.log("Restored original iOS platform config");
        }
    };

    init();

    return fileHelper;
})();

module.exports = function(){
    return fileHelper;
};