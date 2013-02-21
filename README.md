# js-emoji - Display emoji in the browser on PCs and older Macs

Recent OSX and iOS versions allow display and input of emoji. It's nice to show them on 
other devices too, and doing it in the browser is a good place to do it. This
library converts the emoji character codes to HTML span elements which can be styled using CSS.


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

1.  User enters text on iPhone or Mac running Lion
2.  Within that text, user enters some emoji
3.  Data is stored by application
4.  When data is viewed by users on iPhone or Lion Mac, emoji appear nornmally
5.  When data is viewed on PC, older Mac or Linux, emoji are replaced with 
    inline `&lt;span&gt;` elements with background images.

iOS 6switched to using the Unified emoji encodings, instead of Softbank.
You can read about the different encodings <a href="http://www.iamcal.com/emoji-in-web-apps/">here</a>.
When emoji support was added to OSX, it also used the Unified codes.
The upshot is that no conversion is really needed any more, unless you're in 
Japan or want to support iOS 5.


## Using MySQL for storage

Some special care may be needed to store emoji in your database. While some (e.g. Cloud, U+2601) are
within the Basic Multilingual Plane (BMP), others (e.g. Close Umbrella, U+1F302) are not. As such, 
they require 4 bytes of storage. Inside MySQL, this requires switching from `utf8` storage to `utf8mb4`.
You can modify a database and table using a statement like:

    ALTER DATABASE my_database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    ALTER TABLE my_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

You will also need to modify your connection character set.
