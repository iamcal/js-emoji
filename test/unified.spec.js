
describe("Unified replacer", function(){

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
		expect(emoji.replace_unified(emoji_unified(0x2601))).toBe(emoji_span('2601-fe0f'));

		expect(emoji.replace_unified(emoji_unified(0x2601)+emoji_unified(0xfe0f))).toBe(emoji_span('2601-fe0f'));
		// simpe codepoint - fully qualified - cloud

		// surrogate pair - smile
		expect(emoji.replace_unified(emoji_unified(0x1f604))).toBe(emoji_span('1f604'));
	});

	it("replaces multi-codepoint ligatures correctly", function(){

		// uk flag
		expect(emoji.replace_unified(emoji_unified(0x1f1ec)+emoji_unified(0x1f1e7))).toBe(emoji_span('1f1ec-1f1e7'));

		// invalid flag - zz
		var flag_z = emoji_unified(0x1f1ff);
		expect(emoji.replace_unified(flag_z+flag_z)).toBe(flag_z+flag_z);

		// single flag character
		var flag_a = emoji_unified(0x1f1e6);
		expect(emoji.replace_unified(flag_a)).toBe(flag_a);

		// key cap 5
		var cap = emoji_unified(0x20e3);
		expect(emoji.replace_unified('5'+cap)).toBe(emoji_span('0035-fe0f-20e3'));

		// key cap 5 with a space
		expect(emoji.replace_unified('5 '+cap)).toBe('5 '+cap);
	});

	it("multi-codepoint ligatures roundtrip correctly", function(){

		var src = ":man-kiss-man:";
		var uni = emoji_unified(0x1f468)
			+ emoji_unified(0x200d)
			+ emoji_unified(0x2764)
			+ emoji_unified(0xfe0f)
			+ emoji_unified(0x200d)
			+ emoji_unified(0x1f48b)
			+ emoji_unified(0x200d)
			+ emoji_unified(0x1f468);
		var spn = emoji_span('1f468-200d-2764-fe0f-200d-1f48b-200d-1f468');

		emoji.allow_native = true;
		emoji.replace_mode = 'unified';
		expect(emoji.replace_colons(src)).toBe(uni);

		emoji.allow_native = false;
		emoji.replace_mode = 'css';
		expect(emoji.replace_unified(uni)).toBe(spn);
	});

});

