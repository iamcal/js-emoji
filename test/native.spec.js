
describe("Native output", function(){

	var emoji = new EmojiConvertor();

	emoji.allow_native = true;

	it("outputs unified correctly", function(){

		emoji.replace_mode = 'unified';
		emoji.wrap_native = false;

		// simple codepoint - cloud
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_unified(0x2601)+emoji_unified(0xfe0f));

		// modified codepoint - thumbsup
		expect(emoji.replace_colons(':thumbsup::skin-tone-3:')).toBe(emoji_unified(0x1f44d)+emoji_unified(0x1f3fc));
	});

	it("outputs softbank correctly", function(){

		emoji.replace_mode = 'softbank';
		emoji.wrap_native = false;

		// simple codepoint - cloud
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_unified(0xe049));
	});

	it("outputs google correctly", function(){

		emoji.replace_mode = 'google';
		emoji.wrap_native = false;

		// simple codepoint - cloud
		expect(emoji.replace_colons(':cloud:')).toBe(emoji_unified(0xfe001));
	});

	it("outputs wrapped unified correctly", function(){

		emoji.replace_mode = 'unified';
		emoji.wrap_native = true;

		// simple codepoint - cloud
		expect(emoji.replace_colons(':cloud:')).toBe('<span class="emoji-native">'+emoji_unified(0x2601)+emoji_unified(0xfe0f)+'</span>');

		// modified codepoint - thumbsup
		expect(emoji.replace_colons(':thumbsup::skin-tone-3:')).toBe('<span class="emoji-native">'+emoji_unified(0x1f44d)+emoji_unified(0x1f3fc)+'</span>');
	});
});

