function emoji_span(codepoint){
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)"></span>';
}

describe("Colons replacer", function(){

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
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_span('2601'));

		// surrogate pair - smile
		expect(emoji.replace_colons(':smile:')).toBe(emoji_span('1f604'));
	});

	it("replaces multi-codepoint ligatures correctly", function(){

		// uk flag
		expect(emoji.replace_colons(':flag-gb:')).toBe(emoji_span('1f1ec-1f1e7'));

		// key cap 5
		expect(emoji.replace_colons(':five:')).toBe(emoji_span('0035-20e3'));
	});

});

