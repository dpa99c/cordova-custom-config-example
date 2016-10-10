/**
 * Modules
 */
var fs = require('fs');
var path = require('path');
var cwd = path.resolve(); // project root

var fileHelper = require(path.resolve(cwd, 'spec/helper/file.js'))();
var xmlHelper = require(path.resolve(cwd, 'spec/helper/xml.js'))();

/**
 * Globals
 */
var outputManifestPath = 'platforms/android/AndroidManifest.xml';
var outputManifest;

if(!fileHelper.fileExists(outputManifestPath)){
    console.warn("Android manifest not found at "+path.resolve(outputManifestPath));
    return;
}

outputManifest = fileHelper.parseElementtreeSync(outputManifestPath);

describe("cordova-custom-config android output", function() {

    it("should insert manifest-level attributes", function() {
        xmlHelper.assertXpathExists(outputManifest, './[@android:installLocation="somewhere"]');
    });

    it("should insert application-level attributes", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/[@android:hardwareAccelerated="custom"]');
    });

    it("should insert activity-level attributes", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:configChanges="orientation"]');
    });

    it("should preserve Cordova main activity", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:name="MainActivity"]');
    });

    it("should insert attributes on Cordova main activity", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:name="MainActivity"]/[@android:launchMode]');
    });

    it("should delete the specified element", function() {
        xmlHelper.assertXpathNotExists(outputManifest, './application/activity[@android:name="DeleteMe"]');
    });

    it("should override the minSdkVersion", function() {
        xmlHelper.assertXpathExists(outputManifest, './uses-sdk[@android:minSdkVersion="101"]');
    });

    it("should override the maxSdkVersion", function() {
        xmlHelper.assertXpathExists(outputManifest, './uses-sdk[@android:maxSdkVersion="102"]');
    });

    it("should override the targetSdkVersion", function() {
        xmlHelper.assertXpathExists(outputManifest, './uses-sdk[@android:targetSdkVersion="103"]');
    });

    it("should insert root-level supports-screens", function() {
        xmlHelper.assertXpathExists(outputManifest, './supports-screens/[@android:anyDensity="custom"]');
    });

    it("should insert root-level uses-permissions", function() {
        xmlHelper.assertXpathExists(outputManifest, './uses-permission', 4);
    });

    it("should insert root-level uses-features", function() {
        xmlHelper.assertXpathExists(outputManifest, './uses-feature', 2);
    });

    it("should insert root-level permissions", function() {
        xmlHelper.assertXpathExists(outputManifest, './permission', 2);
    });

    it("should insert application-level activities", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity', 5);
    });

    it("should insert application-level receivers", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/receiver', 2);
        xmlHelper.assertXpathExists(outputManifest, './application/receiver/intent-filter/action', 2);
        xmlHelper.assertXpathExists(outputManifest, './application/receiver/intent-filter/category/[@android:name="com.mobiledonky.example.push"]', 1);
    });

    it("should insert application-level services", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/service', 2);
    });

    it("should insert application-level uses-library's", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/uses-library', 2);
    });

    it("should insert Cordova activity-level intent-filters", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:name="MainActivity"]/intent-filter', 4);
    });

    it("should preserve the default Cordova activity-level intent-filter", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:name="MainActivity"]/intent-filter/[@android:label="@string/launcher_name"]', 1);
    });

    it("should insert Cordova activity-level meta-data", function() {
        xmlHelper.assertXpathExists(outputManifest, './application/activity/[@android:name="MainActivity"]/meta-data', 2);
    });

    it("should add rather than replace the config-file root element when add=\"true\"", function() {
        xmlHelper.assertXpathExists(outputManifest, './application', 2);
    });
});