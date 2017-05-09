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
            var specRoot = 'spec/ios/';
            var platformRoot = 'platforms/ios/';
            var platformProjectDir = platformRoot + projectName + '/';

            fileUtils.copySync(specRoot+projectName+'-Info.plist', platformProjectDir+projectName+'-Info.plist');
            fileUtils.copySync(specRoot+'project.pbxproj', platformRoot+projectName+'.xcodeproj/project.pbxproj');
            fileUtils.copySync(specRoot+'build.xcconfig', platformRoot+'cordova/build.xcconfig');
            fileUtils.copySync(specRoot+'build-debug.xcconfig', platformRoot+'cordova/build-debug.xcconfig');
            fileUtils.copySync(specRoot+'build-extras.xcconfig', platformRoot+'cordova/build-extras.xcconfig');
            fileUtils.copySync(specRoot+'build-release.xcconfig', platformRoot+'cordova/build-release.xcconfig');

            console.log("remove: "+platformProjectDir+'Images.xcassets/custom.imageset');
            fileHelper.deleteFolderRecursive(path.resolve(platformProjectDir+'Images.xcassets/custom.imageset'));
            console.log("Restored original iOS platform config");
        },
        deleteFolderRecursive: function(path) {
            var files = [];
            if( fs.existsSync(path) ) {
                files = fs.readdirSync(path);
                files.forEach(function(file,index){
                    var curPath = path + "/" + file;
                    if(fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        }
    };

    init();

    return fileHelper;
})();

module.exports = function(){
    return fileHelper;
};