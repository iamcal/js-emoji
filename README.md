# js-emoji - Display emoji in the browser on PCs and older Macs

Recent OSX and iOS versions allow display and input of emoji. It's nice to show them on 
other devices too, and doing it in the browser is a good place to do it. This work-in-progress

library converts the emoji character codes to HTML span elements which can be styled using CSS.

## Usage

    var output = emoji.replace(input);

    // replaces:
    //   \u{1F6B7}
    // with:
    //   <span class="emoji-no-pedestrians">\u{1F6B7}</span>


## Caveats

The repo does not currently contain the CSS for formatting the emoji.

At present, the function is too slow to be used in production/
It's unclear which part is slow (the finding or the replacing).
