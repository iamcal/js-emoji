function emoji_span(codepoint){
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)"></span>';
}

describe("Emoticons replacer", function(){

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.use_sheet = false;
	emoji.avoid_ms_emoji = true;

	it("replaces emoticons with markup", function(){

		// simple
		expect(emoji.replace_emoticons(':)')).toBe(emoji_span('1f60a'));

		// multiple emoticons that map to a single emoji
		expect(emoji.replace_emoticons(':p' )).toBe(emoji_span('1f61b'));
		expect(emoji.replace_emoticons(':-p')).toBe(emoji_span('1f61b'));
		expect(emoji.replace_emoticons(':P' )).toBe(emoji_span('1f61b'));
		expect(emoji.replace_emoticons(':-P')).toBe(emoji_span('1f61b'));
		expect(emoji.replace_emoticons(':b' )).toBe(emoji_span('1f61b'));
		expect(emoji.replace_emoticons(':-b')).toBe(emoji_span('1f61b'));

		// over-escaped emoticons
		expect(emoji.replace_emoticons(':\\')).toBe(emoji_span('1f615'));
	});

	it("replaces emoticons with colons", function(){

		expect(emoji.replace_emoticons_with_colons('i &lt;3 u')).toBe('i :heart: u');
	});

});

