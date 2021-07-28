describe("Colons replacer", function(){

	var emoji = new EmojiConvertor();

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.use_sheet = false;
	emoji.avoid_ms_emoji = true;

	it("replaces single codepoints correctly", function(){

		// simple codepoint - cloud
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601-fe0f'));

		// surrogate pair - smile
		expect(emoji.replace_colons(':smile:')).toBe(emoji_span('1f604'));
	});

	it("replaces multi-codepoint ligatures correctly", function(){

		// uk flag
		expect(emoji.replace_colons(':flag-gb:')).toBe(emoji_span('1f1ec-1f1e7'));

		// key cap 5
		expect(emoji.replace_colons(':five:')).toBe(emoji_span('0035-fe0f-20e3'));
	});

	it("supports the capitalization flag", function(){

		emoji.allow_caps = false;
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601-fe0f'));
		expect(emoji.replace_colons(':CLOUD:')).toBe(':CLOUD:');
		expect(emoji.replace_colons(':ClOuD:')).toBe(':ClOuD:');

		emoji.allow_caps = true;
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601-fe0f'));
		expect(emoji.replace_colons(':CLOUD:')).toBe(emoji_span('2601-fe0f'));
		expect(emoji.replace_colons(':ClOuD:')).toBe(emoji_span('2601-fe0f'));
	});


	it("doesn't duplicate certain codepoints", function(){

		// As explained in issue #143, certain shortcodes were
		// being rendered twice, due to having multiple variant unified
		// sequences (gender specific plus gender neutral). We should only
		// ever output the first variation.

		var emoji = new EmojiConvertor();

		emoji.replace_mode = 'unified';
		emoji.allow_native = true;

		expect(emoji.replace_colons(':man-running::skin-tone-2:')).toBe('\u{1F3C3}\u{1F3FB}\u{200D}\u{2642}\u{FE0F}');

		emoji.colons_mode = true;

		expect(emoji.replace_unified('\u{1F3C3}\u{1F3FB}\u{200D}\u{2642}\u{FE0F}')).toBe(':man-running::skin-tone-2:');
		expect(emoji.replace_unified('\u{1F3C3}\u{1F3FB}')).toBe(':man-running::skin-tone-2:');
	});

});
