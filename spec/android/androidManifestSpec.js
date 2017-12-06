/**
 * Modules
 */
var fs = require('fs');
var path = require('path');

var fileHelper = require(path.resolve('spec/helper/file.js'))();
var xmlHelper = require(path.resolve('spec/helper/xml.js'))();

/**
 * Globals
 */


var manifestPath = fileHelper.getAndroidManifestPath();
var manifest;

if(!manifestPath) return console.warn("Can't find AndroidManifest.xml in platforms/android");

console.log("Running Android manifest spec");

describe("cordova-custom-config android output after 1 prepare operations", function() {

    beforeAll(function(done) {
        fileHelper.restoreOriginalAndroidConfig();
        fileHelper.runCordova('prepare android', function(err, stdout, stderr){
            manifest = fileHelper.parseElementtreeSync(manifestPath);
            done();
        });
    });

    it("should insert manifest-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './[@android:installLocation="somewhere"]');
    });

    it("should insert application-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './application/[@android:hardwareAccelerated="custom"]');
    });

    it("should insert activity-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:configChanges="orientation"]');
    });

    it("should preserve Cordova main activity", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]');
    });

    it("should insert attributes on Cordova main activity", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/[@android:launchMode]');
    });

    it("should delete the specified element", function() {
        xmlHelper.assertXpathNotExists(manifest, './application/activity[@android:name="DeleteMe"]');
    });

    it("should insert root-level supports-screens", function() {
        xmlHelper.assertXpathExists(manifest, './supports-screens/[@android:anyDensity="custom"]');
    });

    it("should insert root-level uses-permissions", function() {
        xmlHelper.assertXpathExists(manifest, './uses-permission', 4);
    });

    it("should insert root-level uses-features", function() {
        xmlHelper.assertXpathExists(manifest, './uses-feature', 2);
    });

    it("should insert root-level permissions", function() {
        xmlHelper.assertXpathExists(manifest, './permission', 2);
    });

    it("should insert application-level activities", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity', 5);
    });

    it("should insert application-level receivers", function() {
        xmlHelper.assertXpathExists(manifest, './application/receiver', 2);
        xmlHelper.assertXpathExists(manifest, './application/receiver/intent-filter/action', 2);
        xmlHelper.assertXpathExists(manifest, './application/receiver/intent-filter/category/[@android:name="com.mobiledonky.example.push"]', 1);
    });

    it("should insert application-level services", function() {
        xmlHelper.assertXpathExists(manifest, './application/service', 2);
    });

    it("should insert application-level uses-library's", function() {
        xmlHelper.assertXpathExists(manifest, './application/uses-library', 2);
    });

    it("should insert Cordova activity-level intent-filters", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/intent-filter', 4);
    });

    it("should preserve the default Cordova activity-level intent-filter", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/intent-filter/[@android:label="@string/launcher_name"]', 1);
    });

    it("should insert Cordova activity-level meta-data", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/meta-data', 2);
    });

    it("should add rather than replace the config-file root element when add=\"true\"", function() {
        xmlHelper.assertXpathExists(manifest, './application', 2);
    });
});

describe("cordova-custom-config android output after 2 prepare operations", function() {

    beforeAll(function(done) {
        fileHelper.runCordova('prepare android', function(err, stdout, stderr){
            manifest = fileHelper.parseElementtreeSync(manifestPath);
            done();
        });
    });

    it("should insert manifest-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './[@android:installLocation="somewhere"]');
    });

    it("should insert application-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './application/[@android:hardwareAccelerated="custom"]');
    });

    it("should insert activity-level attributes", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:configChanges="orientation"]');
    });

    it("should preserve Cordova main activity", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]');
    });

    it("should insert attributes on Cordova main activity", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/[@android:launchMode]');
    });

    it("should delete the specified element", function() {
        xmlHelper.assertXpathNotExists(manifest, './application/activity[@android:name="DeleteMe"]');
    });

    it("should insert root-level supports-screens", function() {
        xmlHelper.assertXpathExists(manifest, './supports-screens/[@android:anyDensity="custom"]');
    });

    it("should insert root-level uses-permissions", function() {
        xmlHelper.assertXpathExists(manifest, './uses-permission', 4);
    });

    it("should insert root-level uses-features", function() {
        xmlHelper.assertXpathExists(manifest, './uses-feature', 2);
    });

    it("should insert root-level permissions", function() {
        xmlHelper.assertXpathExists(manifest, './permission', 2);
    });

    it("should insert application-level activities", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity', 5);
    });

    it("should insert application-level receivers", function() {
        xmlHelper.assertXpathExists(manifest, './application/receiver', 2);
        xmlHelper.assertXpathExists(manifest, './application/receiver/intent-filter/action', 2);
        xmlHelper.assertXpathExists(manifest, './application/receiver/intent-filter/category/[@android:name="com.mobiledonky.example.push"]', 1);
    });

    it("should insert application-level services", function() {
        xmlHelper.assertXpathExists(manifest, './application/service', 2);
    });

    it("should insert application-level uses-library's", function() {
        xmlHelper.assertXpathExists(manifest, './application/uses-library', 2);
    });

    it("should insert Cordova activity-level intent-filters", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/intent-filter', 4);
    });

    it("should preserve the default Cordova activity-level intent-filter", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/intent-filter/[@android:label="@string/launcher_name"]', 1);
    });

    it("should insert Cordova activity-level meta-data", function() {
        xmlHelper.assertXpathExists(manifest, './application/activity/[@android:name="MainActivity"]/meta-data', 2);
    });

    it("should add rather than replace the config-file root element when add=\"true\"", function() {
        xmlHelper.assertXpathExists(manifest, './application', 3);
    });


});