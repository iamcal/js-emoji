# js-emoji - Display emoji in the browser, everywhere

<span class="badge-npmversion"><a href="https://npmjs.org/package/emoji-js" title="View this project on NPM"><img src="https://img.shields.io/npm/v/emoji-js.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/emoji-js" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/emoji-js.svg" alt="NPM downloads" /></a></span>
[![Build Status](https://github.com/iamcal/js-emoji/actions/workflows/build.yml/badge.svg)](https://github.com/iamcal/js-emoji/actions)
[![Coverage Status](https://coveralls.io/repos/iamcal/js-emoji/badge.svg)](https://coveralls.io/r/iamcal/js-emoji)

Modern computers and phones allow the display and input of emoji, but you often want
to display them on older devices, or in the browser. This library converts emoji
(either from character codes or colon-sequences like `:smile:`) into something that will
work on the host computer - either native character codes, a CSS styled span or a text
representation.


## Installation

Either clone the git repo, or `npm install emoji-js`


## Browser Usage

```html
<link href="emoji.css" rel="stylesheet" type="text/css" />
<script src="emoji.js" type="text/javascript"></script>
<script type="text/javascript">

var emoji = new EmojiConvertor();

// replaces \u{1F604} with platform appropriate content
var output1 = emoji.replace_unified(input);

// replaces :smile: with platform appropriate content
var output2 = emoji.replace_colons(input);

// convert colons explicitly to unicode
emoji.replace_mode = 'unified';
emoji.allow_native = true;
var output3 = emoji.replace_colons(input);

</script>
```

You can view a live demo <a href="http://projects.iamcal.com/js-emoji/demo/demo.htm">here</a>.

## Node Usage

After installing the package via `npm install emoji-js`:

```js
var EmojiConvertor = require('emoji-js');

var emoji = new EmojiConvertor();

console.log(emoji.replace_colons("Hello :smile:"));
```

## Output control

There are many options to control the format of the replacement, although
the defaults should work well on all platforms. There are two overrides which ignore all
other replacement-mode preferences:

* `emoji.text_mode = true` - force text output mode, e.g. `smile` (default `false`)
* `emoji.colons_mode = true` - force colon output mode, e.g. `:smile:` (default: `false`)

After that, the mode is determined automatically by examining the environment and determining
capabilities. You can introspect the auto-detected mode by checking `emoji.replace_mode`, which
can have the following values:

* `unified` - Output Unicode code points
* `softbank` - Output _legacy_ Softbank/iOS code points
* `google` - Output _legacy_ Android code points
* `css` - Output HTML images, using `<span>` elements with CSS background images
* `img` - Output HTML images, using `<img>` elements

You can explicitly override the `emoji.replace_mode` to any of the above values. There are a few
options which determine how the `emoji.replace_mode` value is used at run-time:

* `emoji.allow_native = true` - Allow output of code points (default: `true`, otherwise falls back to `css` or `img` mode)
* `emoji.use_sheet = true` - Use spritesheets with CSS positioning, instead of individual images (default: `false`, only applies in `css` mode)
* `emoji.use_css_imgs = true` - Use individual CSS classes for each emoji, rather than inlining the positioning (default: `false`, only applies in `css` mode, requires the CSS file to be loaded)
* `emoji.avoid_ms_emoji = true` - For browsers on Windows, don't allow native code points (because they look awful) (default: `true`)

There are also some further options that change the nature of the output under various modes:

* `emoji.wrap_native = true` - Wrap native code points in `<span class="emoji-native"></span>` to allow styling (default: `false`, only applies in `native`, `google` and `softbank` modes)
* `emoji.include_title = true` - Set the `"title"` property on the `<span>` or `<img>` tag to the short-name, e.g. `:smile:` (default: `false`, only applies in `css` and `img` modes)
* `emoji.include_text = true` - Set the text inside the `<span>` tag to the short-name, e.g. `:smile:` (default: `false`, only applies in `css` mode)


## Images

The library supports using multiple image sets, which can be selected using
the `emoji.img_set` property. Valid values are:

* `apple` (default)
* `google`
* `twitter`
* `facebook`
* `messenger`

This value is used as a lookup in the `emoji.img_sets` property, which defines
each set. By default, it assumes your images are under the path `/emoji-data/`, but
you can override these values:

    emoji.img_sets.apple.path = 'http://my-cdn.com/emoji-apple-64/';
    emoji.img_sets.apple.sheet = 'http://my-cdn.com/emoji-apple-sheet-64.png';

The `.path` property, the directory containing individual images, must end in a trailing slash.
The `.sheet` property points directly to a spritesheet.
The images can be found in the emoji-data repository: https://github.com/iamcal/emoji-data

Make sure you use the same version of the images that this library was built with, otherwise
spritesheets will not work, and some images may be wrong or missing!

If you need to cache-bust your images, you can use the following property:

    emoji.img_suffix = '?foo';

This will cause the generated URLs to have `?foo` appended (default: `''`).


## Further options

If you wish to allow `:SMILE:` to work the same as `:smile:`, you can set `emoji.allow_caps = true` (default: `false`)

You can add your own emoji aliases, even overriding built-in emoji:

    emoji.addAliases({
      'doge' : '1f415',
      'cat'  : '1f346'
    });

You can then remove your custom aliases, which will also reset built-in emoji back to their original state:

    emoji.removeAliases([
      'doge',
      'cat',
    ]);


## Upgrading from 1.x or 2.x

Prior to version 3.0, the `emoji.js` library would instantiate a global object called `emoji`, which you would call methods on.
In versions 3.0 and later, the library exposes a single class called `EmojiConvertor` which needs to be instantiated manually.
To upgrade old code, simply add this line in a global context:

    var emoji = new EmojiConvertor();


## Lifecycle

The library is designed to be used with the following flow:

1.  User enters text on a modern device, containing native emoji
2.  Data is stored by application, optionally translated to `:colon:` style
3.  When data is viewed by users on iPhone, Mac or Android phone, emoji appear natively
4.  When data is viewed on older devices, emoji are replaced with inline `<span>` elements with background images or simple images.

While the JS library can replace native emoji codepoints, it's significantly slower than replacing colon sequences.
By translating to and storing colon sequences on the backend, you are able to:

* Support older Android phones (Google emoji codepoints)
* Support older iPhones (Softbank emoji codepoints)
* Allow users to enter `:smile:` and have it appear as an emoji everywhere


## Using MySQL for storage

**You don't need to worry about this if you translate to colon syntax before storage.**

Some special care may be needed to store emoji in your database. While some characters (e.g. Cloud, U+2601) are
within the Basic Multilingual Plane (BMP), others (e.g. Close Umbrella, U+1F302) are not. As such,
they require 4 bytes of storage to encode each character. Inside MySQL, this requires switching from `utf8`
storage to `utf8mb4`.

You can modify a database and table using a statement like:

    ALTER DATABASE my_database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    ALTER TABLE my_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

You will also need to modify your connection character set.


## Version History

See [CHANGES.md](CHANGES.md)
