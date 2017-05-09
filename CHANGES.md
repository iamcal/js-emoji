# Version History

## 3.2.2 - 2017-05-08

* Updated to emoji-data 3.0.0 to fix npm incompatibility


## 3.2.1 - 2017-05-06

* Fixed the jQuery plugin to work with 2.x - https://github.com/iamcal/js-emoji/issues/74
* Updated to emoji-data 2.5.2 for better npm dependencies


## 3.2.0 - 2017-05-05

* Updated to emoji-data 2.5.1, with Unicode 9 and Emoji 4 codepoints
* Support for non-appended skin tone modified, e.g. `:woman-swimming:`


## 3.1.1 - 2016-11-11

* Updated to emoji-data 2.4.5, including Android skin tones from Nougat


## 3.1.0 - 2016-09-29

* Added variation text to emoji text when `include_text` is set
* Use native emoji in Chrome and Firefox on OS X (thanks @CharlieHess)
* Handle being in a hidden iframe on Firefox - https://github.com/iamcal/js-emoji/issues/73
* Added `data-codepoints` attribute to all output modes


## 3.0.2 - 2016-06-17

* Fixed test coverage output
* Removed need to call `init_env()` before changing settings
* JSDoc cleanup
* Improved the usage docs
* Changed submodule to use https so Travis etc will work
* Added tests for noConflict mode
* Updated emoji-data to 2.4.4


## 3.0.1 - 2016-06-02

* Added support for aliases
* Added support for img_suffix
* Fixed minification of regexes
* Updated emoji-data to 2.4.3


## 3.0.0 - 2016-04-19

* Switched to exporting a constructor class


## 2.0.0 - 2015-03-09

* New build process with tests
* Skin tone support
* Dropped external CSS


## 1.0.0 - 2014-12-19

* First release
