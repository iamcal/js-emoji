describe("Fallbacks", function(){

	var emoji = new EmojiConvertor();

	emoji.img_sets.apple.path = '/a/';
	emoji.img_sets.google.path = '/g/';
	emoji.img_sets.twitter.path = '/t/';
	emoji.img_sets.facebook.path = '/f/';

	emoji.img_sets.apple.sheet = '/a.png';
	emoji.img_sets.google.sheet = '/g.png';
	emoji.img_sets.twitter.sheet = '/t.png';
	emoji.img_sets.facebook.sheet = '/f.png';

	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;


	// this tests uses a special emoji:
	//
	// 1F3CC-FE0F-200D-2640-FE0F / woman-golfing
	//	this emoji has no image for facebook and no obsolete fallback
	//
	// these tests used to also check that missing images with an obsolete
	// fallback would use the images from the obsolete, but no cases like
	// that currently exist in our supported image sets

	var short_name_a = ':woman-golfing:';
	var codepoints_a = '1f3cc-fe0f-200d-2640-fe0f';
	var positions_a = '17.857142857142858% 25%';


	it("falls back correctly with images", function(){

		emoji.use_sheet = false;

		// apple & google support this emoji
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_image_cp_path(codepoints_a, '/a/'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_image_cp_path(codepoints_a, '/g/'));

		// facebook does not, so this will fallback to apple
		emoji.img_set = 'facebook';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_image_cp_path(codepoints_a, '/a/'));
	});

	it("falls back correctly with sheets", function(){

		emoji.use_sheet = true;

		// apple & google support this emoji
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_sheet_cp_path(codepoints_a, '/a.png', positions_a));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_sheet_cp_path(codepoints_a, '/g.png', positions_a));

		// facebook does not, but the facebook sheet contains the apple image
		emoji.img_set = 'facebook';
		expect(emoji.replace_colons(short_name_a)).toBe(emoji_sheet_cp_path(codepoints_a, '/f.png', positions_a));
	});

});

