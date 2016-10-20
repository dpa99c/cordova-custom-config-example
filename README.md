Cordova/Phonegap Custom Config Example
======================================

This repo contains an example project which illustrates use of the [cordova-custom-config plugin](https://github.com/dpa99c/cordova-custom-config) for iOS and Android, which provides hook scripts to update platform configuration files based on custom preferences and config-file data defined in config.xml that are not supported out-of-the-box by Cordova/Phonegap.


## Contents
* [Downloading](#downloading)
* [Running](#running)
* [Testing](#testing)
* [License](#license)
 
# Downloading

To download the example project, clone it using git:
```
$ git clone https://github.com/dpa99c/cordova-custom-config-example.git

```

# Running

First add the Android and/or iOS platforms to your project:

    $ cordova platform add android
    $ cordova platform add ios
    
Then prepare the platforms to apply the custom config in `config.xml` to the platform configuration files:

    $ cordova prepare

# Testing

[![Build Status](https://travis-ci.org/dpa99c/cordova-custom-config-example.png)](https://travis-ci.org/dpa99c/cordova-custom-config-example)
    
To run the regression tests:

    $ npm test

License
================

The MIT License

Copyright (c) 2016 Working Edge Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.