#!/bin/bash

# Pre-cleanup
rm -Rf node_modules plugins platforms

cordova platform add ios --verbose
rm -Rf node_modules

cordova prepare ios --verbose
rm -Rf node_modules

cordova plugin rm cordova-custom-config --verbose
rm -Rf node_modules

cordova plugin add cordova-custom-config --verbose
rm -Rf node_modules

cordova prepare ios --verbose
rm -Rf node_modules

cordova platform rm ios --verbose

# Post cleanup
rm -Rf node_modules plugins platforms