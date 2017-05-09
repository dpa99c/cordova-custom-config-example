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
var projectName = fileUtils.getProjectName();
var platformProjectDir = 'platforms/ios/'+projectName+'/';
var assetsDir = platformProjectDir+'Images.xcassets/';
var customAssetsDir = assetsDir+'custom.imageset/';

describe("cordova-custom-config iOS resource output", function() {

    beforeAll(function(done) {
        fileHelper.restoreOriginaliOSConfig();
        done();
    });

    console.log("Running iOS resource spec");

    it('should not initially exist in the platform project', function() {
        console.log("spec1");
        expect(fileHelper.fileExists(customAssetsDir)).toEqual(false);
    });

    it('should create the custom asset catalog', function() {
        fileHelper.runCordova('prepare ios', function(err, stdout, stderr){
            expect(fileHelper.fileExists(customAssetsDir)).toEqual(true);
            done();
        });
    });

    it('should copy the image files', function() {
        expect(fileHelper.fileExists(customAssetsDir+'back@1x.png')).toEqual(true);
        expect(fileHelper.fileExists(customAssetsDir+'back@2x.png')).toEqual(true);
        expect(fileHelper.fileExists(customAssetsDir+'back@3x.png')).toEqual(true);
    });

});