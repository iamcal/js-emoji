
describe("Skin variations", function(){

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

	it("replaces colon sequences correctly", function(){

		// this emoji has skin tone variations
		expect(emoji.replace_colons('a :+1::skin-tone-2: b')).toBe('a '+emoji_span('1f44d-1f3fb')+' b');

		// this one doesn't
		expect(emoji.replace_colons('a :smile::skin-tone-2: b')).toBe('a '+emoji_span('1f604')+emoji_span('1f3fb')+' b');

		// test all the skin tones with a skin-varying emoji
		expect(emoji.replace_colons(':thumbsup::skin-tone-1:')).toBe(emoji_span('1f44d')+':skin-tone-1:');
		expect(emoji.replace_colons(':thumbsup::skin-tone-2:')).toBe(emoji_span('1f44d-1f3fb'));
		expect(emoji.replace_colons(':thumbsup::skin-tone-3:')).toBe(emoji_span('1f44d-1f3fc'));
		expect(emoji.replace_colons(':thumbsup::skin-tone-4:')).toBe(emoji_span('1f44d-1f3fd'));
		expect(emoji.replace_colons(':thumbsup::skin-tone-5:')).toBe(emoji_span('1f44d-1f3fe'));
		expect(emoji.replace_colons(':thumbsup::skin-tone-6:')).toBe(emoji_span('1f44d-1f3ff'));
		expect(emoji.replace_colons(':thumbsup::skin-tone-7:')).toBe(emoji_span('1f44d')+':skin-tone-7:');

		// test all the skin tones with a non-skin-varying emoji
		expect(emoji.replace_colons(':zap::skin-tone-1:')).toBe(emoji_span('26a1')+':skin-tone-1:');
		expect(emoji.replace_colons(':zap::skin-tone-2:')).toBe(emoji_span('26a1')+emoji_span('1f3fb'));
		expect(emoji.replace_colons(':zap::skin-tone-3:')).toBe(emoji_span('26a1')+emoji_span('1f3fc'));
		expect(emoji.replace_colons(':zap::skin-tone-4:')).toBe(emoji_span('26a1')+emoji_span('1f3fd'));
		expect(emoji.replace_colons(':zap::skin-tone-5:')).toBe(emoji_span('26a1')+emoji_span('1f3fe'));
		expect(emoji.replace_colons(':zap::skin-tone-6:')).toBe(emoji_span('26a1')+emoji_span('1f3ff'));
		expect(emoji.replace_colons(':zap::skin-tone-7:')).toBe(emoji_span('26a1')+':skin-tone-7:');

		// test the gender skin tones (inserted in the middle)
		expect(emoji.replace_colons(':ok_woman::skin-tone-1:')).toBe(emoji_span('1f646-200d-2640-fe0f')+':skin-tone-1:');
		expect(emoji.replace_colons(':ok_woman::skin-tone-2:')).toBe(emoji_span('1f646-1f3fb-200d-2640-fe0f'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-3:')).toBe(emoji_span('1f646-1f3fc-200d-2640-fe0f'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:')).toBe(emoji_span('1f646-1f3fd-200d-2640-fe0f'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-5:')).toBe(emoji_span('1f646-1f3fe-200d-2640-fe0f'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-6:')).toBe(emoji_span('1f646-1f3ff-200d-2640-fe0f'));
		expect(emoji.replace_colons(':ok_woman::skin-tone-7:')).toBe(emoji_span('1f646-200d-2640-fe0f')+':skin-tone-7:');

		// multiple skins in a row work correctly
		expect(emoji.replace_colons(':thumbsup::skin-tone-3::skin-tone-3:')).toBe(emoji_span('1f44d-1f3fc')+emoji_span('1f3fc'));
		expect(emoji.replace_colons(':zap::skin-tone-3::skin-tone-3:')).toBe(emoji_span('26a1')+emoji_span('1f3fc')+emoji_span('1f3fc'));

		// multiple prefixes in a row work correctly
		expect(emoji.replace_colons(':thumbsup::thumbsup::skin-tone-5:')).toBe(emoji_span('1f44d')+emoji_span('1f44d-1f3fe'));

		// fails as expected if they're not contiguous
		expect(emoji.replace_colons(':thumbsup: :skin-tone-4:')).toBe(emoji_span('1f44d')+' '+emoji_span('1f3fd'));	

		// ZWJ sequence where skin tone is not at the end
		expect(emoji.replace_colons(':male-farmer::skin-tone-3:')).toBe(emoji_span('1f468-1f3fc-200d-1f33e'));

		// test skin tone variation text
		emoji.include_text = true;
		expect(emoji.replace_colons('a :+1::skin-tone-2: b')).toBe('a '+emoji_span('1f44d-1f3fb', ':+1::skin-tone-2:')+' b');
		emoji.include_text = false;
	});

	it("replaces unified sequences correctly", function(){

		var skin1	= emoji_unified(0x1f3f6); // invalid (0x1f3f6a is now real)
		var skin2	= emoji_unified(0x1f3fb);
		var skin3	= emoji_unified(0x1f3fc);
		var skin4	= emoji_unified(0x1f3fd);
		var skin5	= emoji_unified(0x1f3fe);
		var skin6	= emoji_unified(0x1f3ff);
		var skin7	= emoji_unified(0x1f3f2); // also invalid
		var thumbsup	= emoji_unified(0x1f44d);
		var zap		= emoji_unified(0x26a1);
		var ok_woman_start = emoji_unified(0x1f646);
		var ok_woman_trail = emoji_unified(0x200d) + emoji_unified(0x2640) + emoji_unified(0xfe0f);

		// this emoji has skin tone variations
		expect(emoji.replace_unified('a '+thumbsup+skin2+' b')).toBe('a '+emoji_span('1f44d-1f3fb')+' b');

		// this one doesn't
		expect(emoji.replace_unified('a '+zap+skin2+' b')).toBe('a '+emoji_span('26a1')+emoji_span('1f3fb')+' b');

		// test all the skin tones with a skin-varying emoji
		expect(emoji.replace_unified(thumbsup+skin1)).toBe(emoji_span('1f44d')+skin1);
		expect(emoji.replace_unified(thumbsup+skin2)).toBe(emoji_span('1f44d-1f3fb'));
		expect(emoji.replace_unified(thumbsup+skin3)).toBe(emoji_span('1f44d-1f3fc'));
		expect(emoji.replace_unified(thumbsup+skin4)).toBe(emoji_span('1f44d-1f3fd'));
		expect(emoji.replace_unified(thumbsup+skin5)).toBe(emoji_span('1f44d-1f3fe'));
		expect(emoji.replace_unified(thumbsup+skin6)).toBe(emoji_span('1f44d-1f3ff'));
		expect(emoji.replace_unified(thumbsup+skin7)).toBe(emoji_span('1f44d')+skin7);

		// test all the skin tones with a non-skin-varying emoji
		expect(emoji.replace_unified(zap+skin1)).toBe(emoji_span('26a1')+skin1);
		expect(emoji.replace_unified(zap+skin2)).toBe(emoji_span('26a1')+emoji_span('1f3fb'));
		expect(emoji.replace_unified(zap+skin3)).toBe(emoji_span('26a1')+emoji_span('1f3fc'));
		expect(emoji.replace_unified(zap+skin4)).toBe(emoji_span('26a1')+emoji_span('1f3fd'));
		expect(emoji.replace_unified(zap+skin5)).toBe(emoji_span('26a1')+emoji_span('1f3fe'));
		expect(emoji.replace_unified(zap+skin6)).toBe(emoji_span('26a1')+emoji_span('1f3ff'));
		expect(emoji.replace_unified(zap+skin7)).toBe(emoji_span('26a1')+skin7);

		// test all the skin tones with a inner-skin-tone modifier
		expect(emoji.replace_unified(ok_woman_start+skin2+ok_woman_trail)).toBe(emoji_span('1f646-1f3fb-200d-2640-fe0f'));
		expect(emoji.replace_unified(ok_woman_start+skin3+ok_woman_trail)).toBe(emoji_span('1f646-1f3fc-200d-2640-fe0f'));
		expect(emoji.replace_unified(ok_woman_start+skin4+ok_woman_trail)).toBe(emoji_span('1f646-1f3fd-200d-2640-fe0f'));
		expect(emoji.replace_unified(ok_woman_start+skin5+ok_woman_trail)).toBe(emoji_span('1f646-1f3fe-200d-2640-fe0f'));
		expect(emoji.replace_unified(ok_woman_start+skin6+ok_woman_trail)).toBe(emoji_span('1f646-1f3ff-200d-2640-fe0f'));

		// multiple skins in a row work correctly
		expect(emoji.replace_unified(thumbsup+skin3+skin3)).toBe(emoji_span('1f44d-1f3fc')+emoji_span('1f3fc'));
		expect(emoji.replace_unified(zap     +skin3+skin3)).toBe(emoji_span('26a1')+emoji_span('1f3fc')+emoji_span('1f3fc'));

		// multiple prefixes in a row work correctly
		expect(emoji.replace_unified(thumbsup+thumbsup+skin5)).toBe(emoji_span('1f44d')+emoji_span('1f44d-1f3fe'));

		// fails as expected if they're not contiguous
		expect(emoji.replace_unified(thumbsup+' '+skin4)).toBe(emoji_span('1f44d')+' '+emoji_span('1f3fd'));
	});

	it("replaces colon sequences correctly with unified codepoints", function(){

		emoji.allow_native = true;
		emoji.replace_mode = 'unified';

		// ZWJ sequence where skin tone is not at the end
		expect(emoji.replace_colons(':male-farmer::skin-tone-3:')).toBe(emoji_unified(0x1f468) + emoji_unified(0x1f3fc) + emoji_unified(0x200d) + emoji_unified(0x1f33e));

	});

});

