function emoji_image_cp_path(cp, path){
	return '<span class="emoji emoji-sizer" style="background-image:url('+path+cp+'.png)" data-codepoints="'+cp+'"></span>';
}

function emoji_sheet_cp_path(cp, path, b_pos, b_size){
	return '<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="background: url('+path+');background-position:'+b_pos+';background-size:'+b_size
		+'" data-codepoints="'+cp+'"></span></span>';
}

describe("Fallbacks", function(){

	var emoji = new EmojiConvertor();

	emoji.img_sets.apple.path = '/a/';
	emoji.img_sets.google.path = '/g/';
	emoji.img_sets.twitter.path = '/t/';

	emoji.img_sets.apple.sheet = '/a.png';
	emoji.img_sets.google.sheet = '/g.png';
	emoji.img_sets.twitter.sheet = '/t.png';

	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	it("falls back correctly with images", function(){

		emoji.use_sheet = false;

		// this only exists for apple and twitter
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_image_cp_path('1f3ca-200d-2640-fe0f', '/a/'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_image_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/a/'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_image_cp_path('1f3ca-200d-2640-fe0f', '/a/'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_image_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/a/'));

		emoji.img_set = 'twitter';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_image_cp_path('1f3ca-200d-2640-fe0f', '/t/'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_image_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/t/'));

	});

	it("falls back correctly with sheets", function(){

		emoji.use_sheet = true;

		// this only exists for apple and twitter
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_sheet_cp_path('1f3ca-200d-2640-fe0f', '/a.png', '83.33333333333334% 25%', '4900%'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_sheet_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/a.png', '83.33333333333334% 35.41666666666667%', '4900%'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_sheet_cp_path('1f3ca-200d-2640-fe0f', '/g.png', '83.33333333333334% 25%', '4900%'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_sheet_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/g.png', '83.33333333333334% 35.41666666666667%', '4900%'));

		emoji.img_set = 'twitter';
		expect(emoji.replace_colons(':woman-swimming:')).toBe(emoji_sheet_cp_path('1f3ca-200d-2640-fe0f', '/t.png', '83.33333333333334% 25%', '4900%'));
		expect(emoji.replace_colons(':woman-swimming::skin-tone-6:')).toBe(emoji_sheet_cp_path('1f3ca-1f3ff-200d-2640-fe0f', '/t.png', '83.33333333333334% 35.41666666666667%', '4900%'));

	});

});

