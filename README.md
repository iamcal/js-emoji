# js-emoji - Display emoji in the browser on PCs and older Macs

Recent OSX and iOS versions allow display and input of emoji. It's nice to show them on 
other devices too, and the browser is a good place to do it. This library converts the 
emoji character codes to HTML span elements which can be styled using CSS.


## Usage

    <link href="emoji.css" rel="stylesheet" type="text/css" />
    <script src="emoji.js" type="text/javascript"></script>
    <script type="text/javascript">

    var output = emoji.replace(input);

    // replaces:
    //   \u{1F6B7}
    // with:
    //   <span class="emoji-no-pedestrians">\u{1F6B7}</span>

    </script>

You can view a live demo <a href="http://unicodey.com/js-emoji/demo.htm">here</a>.


## Lifecycle

The library is designed to be used with the following flow:

1.  User enters text on iPhone or Mac running OSX Lion
2.  Within that text, user enters some emoji
3.  Data is stored by application
4.  When data is viewed by users on iPhone or Lion Mac, emoji appear normally
5.  When data is viewed on PC, older Mac or Linux, emoji are replaced with 
    inline `<span>` elements with background images.

With version 6, iOS switched to using the Unified emoji encodings, instead of the previous
Softbank codes.
You can read about the different encodings <a href="http://www.iamcal.com/emoji-in-web-apps/">here</a>.
When emoji support was added in OSX, it also used the Unified codes.
The upshot is that no conversion is really necessary any more, unless you have users in 
Japan or want to support older iOS versions (5 and below).


## Using MySQL for storage

Some special care may be needed to store emoji in your database. While some characters (e.g. Cloud, U+2601) are
within the Basic Multilingual Plane (BMP), others (e.g. Close Umbrella, U+1F302) are not. As such, 
they require 4 bytes of storage to encode each character. Inside MySQL, this requires switching from `utf8` 
storage to `utf8mb4`.
You can modify a database and table using a statement like:

    ALTER DATABASE my_database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    ALTER TABLE my_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

You will also need to modify your connection character set.


## Known issues

*  The image used for replacement is lacking some of the emoji added in iOS 6. If you
   have a more recent image, please send a pull request.
*  The replaced images are fixed at 20px square. By modifying the CSS (both the base
   class and the positioning info) you could scale them, but this would be awkward.
   A solution using canvas scaling might be possible.
*  There is no user agent detection, so as-is the code will replace emoji with images
   even on platforms that support emoji natively.

