describe("Obsoletes", function(){

	var emoji = new EmojiConvertor();

	emoji.img_sets.apple.path = '/a/';
	emoji.img_sets.apple.sheet = '/a.png';

	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	it("converts unified to the new form", function(){

		var swimmer		= emoji_unified(0x1f3ca);
		var man_swimming	= emoji_unified(0x1f3ca)+emoji_unified(0x200d)+emoji_unified(0x2642)+emoji_unified(0xfe0f);

		var swimmer_s6		= emoji_unified(0x1f3ca)+emoji_unified(0x1f3ff);
		var man_swimming_s6	= emoji_unified(0x1f3ca)+emoji_unified(0x1f3ff)+emoji_unified(0x200d)+emoji_unified(0x2642)+emoji_unified(0xfe0f);

		emoji.colons_mode = true;

		expect(emoji.replace_unified(swimmer)).toBe(':man-swimming:');
		expect(emoji.replace_unified(man_swimming)).toBe(':man-swimming:');

		expect(emoji.replace_unified(swimmer_s6)).toBe(':man-swimming::skin-tone-6:');
		expect(emoji.replace_unified(man_swimming_s6)).toBe(':man-swimming::skin-tone-6:');
	});

	it("obsolete versions match (sheets)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = true;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));
	});

	it("obsolete versions match (images)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = false;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));
	});


});

