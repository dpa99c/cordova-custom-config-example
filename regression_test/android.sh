#!/bin/bash

# Pre-cleanup
rm -Rf node_modules plugins platforms

cordova platform add android --verbose
rm -Rf node_modules

cordova prepare android --verbose
rm -Rf node_modules

cordova plugin rm cordova-custom-config --verbose
rm -Rf node_modules

cordova plugin add cordova-custom-config --verbose
rm -Rf node_modules

cordova prepare android --verbose
rm -Rf node_modules

cordova platform rm android --verbose
rm -Rf node_modules

cordova platform add android --verbose

# Post cleanup
rm -Rf node_modules plugins platforms