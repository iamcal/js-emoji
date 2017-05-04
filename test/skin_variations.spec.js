function emoji_unified(cp){
	if (cp < 0x10000) return String.fromCharCode(cp);
	var h = Math.floor((cp - 0x10000) / 0x400) + 0xD800;
	var l = ((cp - 0x10000) % 0x400) + 0xDC00;
	return String.fromCharCode(h) + String.fromCharCode(l);
}

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

		// multiple prefixes in a row work correctly
		expect(emoji.replace_colons(':ok_woman::ok_woman::skin-tone-5:')).toBe(emoji_span('1f646')+emoji_span('1f646-1f3fe'));

		// fails as expected if they're not contiguous
		expect(emoji.replace_colons(':ok_woman: :skin-tone-4:')).toBe(emoji_span('1f646')+' '+emoji_span('1f3fd'));	

		// test skin tone variation text
		emoji.include_text = true;
		expect(emoji.replace_colons('a :+1::skin-tone-2: b')).toBe('a '+emoji_span('1f44d-1f3fb', ':+1::skin-tone-2:')+' b');
		emoji.include_text = false;

		// test new gender skin tones
		expect(emoji.replace_colons(':woman-swimming::skin-tone-3:')).toBe(emoji_span('1f3ca-1f3fc-200d-2640-fe0f'));
	});

	it("replaces unified sequences correctly", function(){

		var skin1	= emoji_unified(0x1f3f6); // invalid (0x1f3f6a is now real)
		var skin2	= emoji_unified(0x1f3fb);
		var skin3	= emoji_unified(0x1f3fc);
		var skin4	= emoji_unified(0x1f3fd);
		var skin5	= emoji_unified(0x1f3fe);
		var skin6	= emoji_unified(0x1f3ff);
		var skin7	= emoji_unified(0x1f3f2); // also invalid
		var ok_woman	= emoji_unified(0x1f646);
		var zap		= emoji_unified(0x26a1);

		// this emoji has skin tone variations
		expect(emoji.replace_unified('a '+ok_woman+skin2+' b')).toBe('a '+emoji_span('1f646-1f3fb')+' b');

		// this one doesn't
		expect(emoji.replace_unified('a '+zap+skin2+' b')).toBe('a '+emoji_span('26a1')+emoji_span('1f3fb')+' b');

		// test all the skin tones with a skin-varying emoji
		expect(emoji.replace_unified(ok_woman+skin1)).toBe(emoji_span('1f646')+skin1);
		expect(emoji.replace_unified(ok_woman+skin2)).toBe(emoji_span('1f646-1f3fb'));
		expect(emoji.replace_unified(ok_woman+skin3)).toBe(emoji_span('1f646-1f3fc'));
		expect(emoji.replace_unified(ok_woman+skin4)).toBe(emoji_span('1f646-1f3fd'));
		expect(emoji.replace_unified(ok_woman+skin5)).toBe(emoji_span('1f646-1f3fe'));
		expect(emoji.replace_unified(ok_woman+skin6)).toBe(emoji_span('1f646-1f3ff'));
		expect(emoji.replace_unified(ok_woman+skin7)).toBe(emoji_span('1f646')+skin7);

		// test all the skin tones with a non-skin-varying emoji
		expect(emoji.replace_unified(zap+skin1)).toBe(emoji_span('26a1')+skin1);
		expect(emoji.replace_unified(zap+skin2)).toBe(emoji_span('26a1')+emoji_span('1f3fb'));
		expect(emoji.replace_unified(zap+skin3)).toBe(emoji_span('26a1')+emoji_span('1f3fc'));
		expect(emoji.replace_unified(zap+skin4)).toBe(emoji_span('26a1')+emoji_span('1f3fd'));
		expect(emoji.replace_unified(zap+skin5)).toBe(emoji_span('26a1')+emoji_span('1f3fe'));
		expect(emoji.replace_unified(zap+skin6)).toBe(emoji_span('26a1')+emoji_span('1f3ff'));
		expect(emoji.replace_unified(zap+skin7)).toBe(emoji_span('26a1')+skin7);

		// multiple skins in a row work correctly
		expect(emoji.replace_unified(ok_woman+skin3+skin3)).toBe(emoji_span('1f646-1f3fc')+emoji_span('1f3fc'));
		expect(emoji.replace_unified(zap     +skin3+skin3)).toBe(emoji_span('26a1')+emoji_span('1f3fc')+emoji_span('1f3fc'));

		// multiple prefixes in a row work correctly
		expect(emoji.replace_unified(ok_woman+ok_woman+skin5)).toBe(emoji_span('1f646')+emoji_span('1f646-1f3fe'));

		// fails as expected if they're not contiguous
		expect(emoji.replace_unified(ok_woman+' '+skin4)).toBe(emoji_span('1f646')+' '+emoji_span('1f3fd'));

		// test new gender skin tones
		var woman_swimming_skin3 = emoji_unified(0x1f3ca)	// swimming
					+ emoji_unified(0x1f3fc)	// skin tone 3
					+ emoji_unified(0x200d)		// zero-width joiner
					+ emoji_unified(0x2640)		// woman
					+ emoji_unified(0xfe0f);	// image-mode
		expect(emoji.replace_unified(woman_swimming_skin3)).toBe(emoji_span('1f3ca-1f3fc-200d-2640-fe0f'));
	});

});

