#!/usr/bin/env node

var fileHelper = (function(){

    /**********************
     * Internal properties
     *********************/
    var fileHelper;

    var fs = require('fs');
    var path = require('path');
    var et = require('elementtree');

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
        }
    };
    return fileHelper;
})();

module.exports = function(){
    return fileHelper;
};