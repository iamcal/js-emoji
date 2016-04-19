function emoji_span(codepoint){
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)"></span>';
}

describe("Colons replacer", function(){

	var e = new EmojiConvertor();

	e.img_set = 'apple';
	e.img_sets.apple.path = '/';
	e.use_css_imgs = false;
	e.colons_mode = false;
	e.text_mode = false;
	e.include_title = false;
	e.allow_native = false;
	e.use_sheet = false;
	e.avoid_ms_emoji = true;

	it("replaces single codepoints correctly", function(){

		// simple codepoint - cloud
		expect(e.replace_colons(':cloud:')).toBe(emoji_span('2601'));

		// surrogate pair - smile
		expect(e.replace_colons(':smile:')).toBe(emoji_span('1f604'));
	});

	it("replaces multi-codepoint ligatures correctly", function(){

		// uk flag
		expect(e.replace_colons(':flag-gb:')).toBe(emoji_span('1f1ec-1f1e7'));

		// key cap 5
		expect(e.replace_colons(':five:')).toBe(emoji_span('0035-20e3'));
	});

	it("supports the capitalization flag", function(){

		emoji.allow_caps = false;
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601'));
		expect(emoji.replace_colons(':CLOUD:')).toBe(':CLOUD:');
		expect(emoji.replace_colons(':ClOuD:')).toBe(':ClOuD:');

		emoji.allow_caps = true;
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601'));
		expect(emoji.replace_colons(':CLOUD:')).toBe(emoji_span('2601'));
		expect(emoji.replace_colons(':ClOuD:')).toBe(emoji_span('2601'));
	});

});

