# js-emoji - Display emoji in the browser, everywhere

[![Build Status](https://travis-ci.org/iamcal/js-emoji.svg)](https://travis-ci.org/iamcal/js-emoji)
[![Coverage Status](https://coveralls.io/repos/iamcal/js-emoji/badge.svg)](https://coveralls.io/r/iamcal/js-emoji)

Most macOS and iOS versions allow display and input of emoji. It's nice to show them on 
other devices too, and the browser is a good place to do it. This library converts emoji
(either from character codes or colon-sequences like `:smile:`) into something that will
work on the host computer - either native character codes, a CSS styled span or a text
representation.


## Installation

Either clone the git repo, or `npm install emoji-js`


## Usage

```html
<link href="emoji.css" rel="stylesheet" type="text/css" />
<script src="emoji.js" type="text/javascript"></script>
<script type="text/javascript">

var emoji = new EmojiConvertor();

// replaces \u{1F604} with platform appropriate content
var output1 = emoji.replace_unified(input);

// replaces :smile: with platform appropriate content
var output2 = emoji.replace_colons(input);

// force text output mode
emoji.text_mode = true;

// show the short-name as a `title` attribute for css/img emoji
emoji.include_title = true;

// change the path to your emoji images (requires trailing slash)
// you can grab the images from the emoji-data link here:
// https://github.com/iamcal/js-emoji/tree/master/build
emoji.img_sets.apple.path = 'http://my-cdn.com/emoji-apple-64/';
emoji.img_sets.apple.sheet = 'http://my-cdn.com/emoji-apple-sheet-64.png';

// Configure this library to use the sheets defined in `img_sets` (see above)
emoji.use_sheet = true;

// find out the auto-detected mode
alert(emoji.replace_mode);

// add some aliases of your own - you can override builtins too
emoji.addAliases({
  'doge' : '1f415',
  'cat'  : '1f346'
});

// remove your custom aliases - this will reset builtins
emoji.removeAliases([
  'doge',
  'cat',
]);

// convert colons to unicode
emoji.init_env(); // else auto-detection will trigger when we first convert
emoji.replace_mode = 'unified';
emoji.allow_native = true;
var output3 = emoji.replace_colons(input);

</script>
```

You can view a live demo <a href="http://unicodey.com/js-emoji/demo/demo.htm">here</a>.


## Upgrading from 1.x or 2.x

Prior to version 3.0, the `emoji.js` library would instantiate a global object called `emoji`, which you would call methods on.
In versions 3.0 and later, the library exposes a single class called `EmojiConvertor` which needs to be instantiated manually.
To upgrade old code, simply add this line in a global context:

    var emoji = new EmojiConvertor();


## Lifecycle

The library is designed to be used with the following flow:

1.  User enters text on an iPhone/iPod, Mac running OSX Lion (or later) or Android phone
2.  Within that text, user enters some emoji
3.  Data is stored by application, optionally translated to `:colon:` style
4.  When data is viewed by users on iPhone, Lion Mac or Android phone, emoji appear normally
5.  When data is viewed on PC, older Mac or Linux, emoji are replaced with inline `<span>` elements with background images or simple images.

While the JS library can replace unified emoji codes (as used by iOS6), it's **much** slower than
replacing colon sequences. By translating to and storing colon sequences on the backend, you are able to:

* Support Android phones (Google emoji codepoints)
* Support older iPhones (Softbank emoji codepoints)
* Allow PC users to enter `:smile:` and have it appear as an emoji everywhere


## Using MySQL for storage

Some special care may be needed to store emoji in your database. While some characters (e.g. Cloud, U+2601) are
within the Basic Multilingual Plane (BMP), others (e.g. Close Umbrella, U+1F302) are not. As such, 
they require 4 bytes of storage to encode each character. Inside MySQL, this requires switching from `utf8` 
storage to `utf8mb4`.

You can modify a database and table using a statement like:

    ALTER DATABASE my_database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    ALTER TABLE my_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

You will also need to modify your connection character set.

You don't need to worry about this if you translate to colon syntax before storage.


## Version History

See [CHANGES.md](CHANGES.md)
