/**
 * Modules
 */
var path = require('path');
var fs = require('fs');

var fileHelper = require(path.resolve('spec/helper/file.js'))();


var context = fileHelper.getFakeCordovaContext();
var fileUtils = require(path.resolve('plugins/cordova-custom-config/hooks/fileUtils.js'))(context);

/**
 * Globals
 */
var xcconfigPath = {
    default: 'platforms/ios/cordova/build.xcconfig',
    debug: 'platforms/ios/cordova/build-debug.xcconfig',
    release: 'platforms/ios/cordova/build-release.xcconfig',
    extras: 'platforms/ios/cordova/build-extras.xcconfig'
};
var xcconfig = {};


function expectString(xcconfig, str){
    expect(xcconfig.indexOf(str) != -1).toEqual(true);
}


describe("cordova-custom-config iOS xcconfig output", function() {

    beforeAll(function(done) {
        fileHelper.restoreOriginaliOSConfig();
        fileHelper.runCordova('prepare ios', function(err, stdout, stderr){
            for(var config in xcconfigPath){
                if(!fileHelper.fileExists(xcconfigPath[config])){
                    throw "iOS xcconfig not found at "+path.resolve(xcconfigPath[config]);
                }
                xcconfig[config] = fs.readFileSync(xcconfigPath[config], 'utf-8');
            }
            done();
        });
    });

    console.log("Running iOS xcconfig spec");

    it('should override *.xcconfig by default', function() {
        expectString(xcconfig.default, 'TARGETED_DEVICE_FAMILY = 1,2,3');
    });

    it('should NOT respect the quote attribute', function() {
        expectString(xcconfig.debug, 'QUOTE_BOTH = YES');
    });

    it('should respect the buildType attribute', function() {
        expectString(xcconfig.debug, 'CODE_SIGN_IDENTITY = iPhone Developer: Dave Alden (8VUQ6DYDLL)');
        expectString(xcconfig.release, 'CODE_SIGN_IDENTITY = iPhone Distribution: Working Edge Ltd (556F3DRHUD');
    });

    it('should respect the xcconfigEnforce attribute', function() {
        expectString(xcconfig.release, 'CODE_SIGN_IDENTITY = iPhone Distribution: Working Edge Ltd (556F3DRHUD)');
        expectString(xcconfig.release, 'CODE_SIGN_IDENTITY[sdk=iphoneos*] = iPhone Distribution');
        expectString(xcconfig.release, 'CODE_SIGN_IDENTITY[sdk=iphoneos9.1] = iPhone Distribution: Working Edge Ltd (556F3DRHUD)');
    });

});