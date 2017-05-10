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
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

var projectName = fileUtils.getProjectName();
var platformProjectDir = 'platforms/ios/'+projectName+'/';
var assetsDir = platformProjectDir+'Images.xcassets/';
var customAssetsDir = assetsDir+'custom.imageset/';

describe("cordova-custom-config iOS resource output", function() {

    beforeAll(function() {
        fileHelper.restoreOriginaliOSConfig();
    });

    console.log("Running iOS resource spec");

    it('should not initially exist in the platform project', function(done) {
        expect(fileHelper.fileExists(customAssetsDir)).toEqual(false);
        fileHelper.runCordova('prepare ios', function(err, stdout, stderr){
            done();
        });
    });

    it('should create the custom asset catalog', function() {
        expect(fileHelper.fileExists(customAssetsDir)).toEqual(true);
    });

    it('should copy the image files', function() {
        expect(fileHelper.fileExists(customAssetsDir+'back@1x.png')).toEqual(true);
        expect(fileHelper.fileExists(customAssetsDir+'back@2x.png')).toEqual(true);
        expect(fileHelper.fileExists(customAssetsDir+'back@3x.png')).toEqual(true);
    });

    it('should insert entries into the Contents.json file', function() {
        var contents = fs.readFileSync(customAssetsDir+"Contents.json");
        expect(!!contents).toEqual(true);
        contents = JSON.parse(contents);
        var images = contents.images;
        expect(images[0].filename).toEqual("back@1x.png");
        expect(images[1].filename).toEqual("back@2x.png");
        expect(images[2].filename).toEqual("back@3x.png");
        expect(images[0].scale).toEqual("1x");
        expect(images[1].scale).toEqual("2x");
        expect(images[2].scale).toEqual("3x");
        expect(images[0].idiom).toEqual("universal");
        expect(images[1].idiom).toEqual("iphone");
        expect(images[2].idiom).toEqual("ipad");
    });

});