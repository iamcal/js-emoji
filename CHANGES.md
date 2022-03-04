# Version History

## 3.7.0 - 2022-03-04

* Updated dev dependency versions based on security advisories
* Removed the (undocumented) `.supports_css` prop that was used in tests and was incorrectly stopping `.replace_mode = 'img'` from working - https://github.com/iamcal/js-emoji/issues/152

## 3.6.0 - 2021-07-27

* Updated to Emoji 13.1 (emoji-data v7.0.2)
* Fixed positioning of CSS sprites to avoid blurring & cutoffs
* Better documentation
* Include `emoji.css` in the NPM package
* Support for Mac OS Big Sur user agent matching
* This library *does not yet support* multiple skin tones in a single emoji
* Fixed some emojis being duplicated (see #113)

## 3.5.0 - 2020-01-07

* Updated to emoji-data 4.1.0
* Removed EmojiOne at the request of EmojiOne/JoyPixels staff
* Added support for React Native

## 3.4.1 - 2018-06-14

* Corrected unified output for ZWJ seequences where the skin tone is not the last codepoint - https://github.com/iamcal/js-emoji/issues/101
* Updated to emoji-data v4.0.4 (containg several fixes)


## 3.4.0 - 2017-11-19

* Updated to emoji-data 4.0.0, supporting the Emoji 5 standard
* Support for emoji spritesheets with 1px padding to avoid image bleed


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
