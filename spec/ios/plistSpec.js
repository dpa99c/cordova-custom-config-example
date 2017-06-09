/**
 * Modules
 */
var path = require('path');
var fs = require('fs');
var plist = require('plist');

var fileHelper = require(path.resolve('spec/helper/file.js'))();


var context = fileHelper.getFakeCordovaContext();
var fileUtils = require(path.resolve('plugins/cordova-custom-config/hooks/fileUtils.js'))(context);
var logger = require(path.resolve('plugins/cordova-custom-config/hooks/logger.js'))(context);


/**
 * Globals
 */
var projectName = fileUtils.getProjectName();
var plistPath = 'platforms/ios/'+projectName+'/'+projectName+'-Info.plist';
var infoPlist;

if(!fileHelper.fileExists(plistPath)){
    console.warn("iOS plist not found at "+path.resolve(plistPath));
    return;
}

describe("cordova-custom-config iOS plist output", function() {

    beforeAll(function(done) {
        fileHelper.restoreOriginaliOSConfig();
        fileHelper.runCordova('prepare ios', function(err, stdout, stderr){
            infoPlist = plist.parse(fs.readFileSync(plistPath, 'utf8'));
            done();
        });
    });


    console.log("Running iOS plist spec");

    it("should merge with existing array values by default", function() {
        expect(infoPlist['LSApplicationQueriesSchemes']).toEqual([
            'fbapi',
            'fb-messenger-api',
            'fbauth2',
            'fbshareextension',
            'myapp',
            'myapp2',
            'myapp3'
        ]);
    });

    it("should merge with existing array values when mode=\"merge\"", function() {
        expect(infoPlist['UISupportedInterfaceOrientations']).toEqual([
            'UIInterfaceOrientationLandscapeLeft',
            'UIInterfaceOrientationLandscapeRight',
            'UIInterfaceOrientationPortrait',
            'UIInterfaceOrientationPortraitUpsideDown'
        ]);
    });

    it("should replace existing array values when mode=\"replace\"", function() {
        expect(infoPlist['UISupportedInterfaceOrientations~ipad']).toEqual([
            'UIInterfaceOrientationPortrait',
            'UIInterfaceOrientationPortraitUpsideDown'
        ]);
    });

    it("should add location background mode", function() {
        expect(infoPlist['UIBackgroundModes']).toEqual([ 'location' ]);
    });

    it("should add location usage descriptions", function() {
        expect(infoPlist['NSLocationAlwaysUsageDescription']).toEqual('This app requires constant access to your location in order to track your position, even when the screen is off.');
        expect(infoPlist['NSLocationWhenInUseUsageDescription']).toEqual('This app will now only track your location when the screen is on and the app is displayed.');
    });

    it("should delete exist key/value pairs when mode=\"delete\"", function() {
        expect(infoPlist['DeleteMyKey']).toBeFalsy();
    });
});