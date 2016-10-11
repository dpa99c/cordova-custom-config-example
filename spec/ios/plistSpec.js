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

infoPlist = plist.parse(fs.readFileSync(plistPath, 'utf8'));

logger.dump(infoPlist);

describe("cordova-custom-config iOS plist output", function() {

    console.log("Running iOS plist spec");

    it("should override default Cordova iPhone orientations", function() {
        expect(infoPlist['UISupportedInterfaceOrientations']).toEqual([ 'UIInterfaceOrientationPortrait', 'UIInterfaceOrientationPortraitUpsideDown' ]);
    });

    it("should override default Cordova iPad orientations", function() {
        expect(infoPlist['UISupportedInterfaceOrientations~ipad']).toEqual([ 'UIInterfaceOrientationPortrait', 'UIInterfaceOrientationPortraitUpsideDown' ]);
    });

    it("should add location background mode", function() {
        expect(infoPlist['UIBackgroundModes']).toEqual([ 'location' ]);
    });

    it("should add location usage descriptions", function() {
        expect(infoPlist['NSLocationAlwaysUsageDescription']).toEqual('This app requires constant access to your location in order to track your position, even when the screen is off.');
        expect(infoPlist['NSLocationWhenInUseUsageDescription']).toEqual('This app will now only track your location when the screen is on and the app is displayed.');
    });
});