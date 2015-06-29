describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});


function emoji_span(codepoint){
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)"></span>';
}

describe("Skin variations", function(){

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.use_sheet = false;
	emoji.avoid_ms_emoji = true;

	it("replaces colon sequences correctly", function(){

		// this emoji has skin tone variations
		expect(emoji.replace_colons('a :+1::skin-tone-2: b')).toBe('a '+emoji_span('1f44d-1f3fb')+' b');

		// this one doesn't
		expect(emoji.replace_colons('a :smile::skin-tone-2: b')).toBe('a '+emoji_span('1f604')+emoji_span('1f3fb')+' b');

		// test all the skin tones with a skin-varying emoji
		expect(emoji.replace_colons(':ok_woman::skin-tone-1:')).toBe(emoji_span('1f646')+':skin-tone-1:');
		expect(emoji.replace_colons(':ok_woman::skin-tone-2:')).toBe(emoji_span('1f646-1f3fb'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-3:')).toBe(emoji_span('1f646-1f3fc'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:')).toBe(emoji_span('1f646-1f3fd'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-5:')).toBe(emoji_span('1f646-1f3fe'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-6:')).toBe(emoji_span('1f646-1f3ff'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-7:')).toBe(emoji_span('1f646')+':skin-tone-7:');

		// test all the skin tones with a non-skin-varying emoji
		expect(emoji.replace_colons(':zap::skin-tone-1:')).toBe(emoji_span('26a1')+':skin-tone-1:');
		expect(emoji.replace_colons(':zap::skin-tone-2:')).toBe(emoji_span('26a1')+emoji_span('1f3fb'));
		expect(emoji.replace_colons(':zap::skin-tone-3:')).toBe(emoji_span('26a1')+emoji_span('1f3fc'));
		expect(emoji.replace_colons(':zap::skin-tone-4:')).toBe(emoji_span('26a1')+emoji_span('1f3fd'));
		expect(emoji.replace_colons(':zap::skin-tone-5:')).toBe(emoji_span('26a1')+emoji_span('1f3fe'));
		expect(emoji.replace_colons(':zap::skin-tone-6:')).toBe(emoji_span('26a1')+emoji_span('1f3ff'));
		expect(emoji.replace_colons(':zap::skin-tone-7:')).toBe(emoji_span('26a1')+':skin-tone-7:');

		// multiple skins in a row work correctly
		expect(emoji.replace_colons(':ok_woman::skin-tone-3::skin-tone-3:')).toBe(emoji_span('1f646-1f3fc')+emoji_span('1f3fc'));
		expect(emoji.replace_colons(':zap::skin-tone-3::skin-tone-3:')).toBe(emoji_span('26a1')+emoji_span('1f3fc')+emoji_span('1f3fc'));
		
	});

});

