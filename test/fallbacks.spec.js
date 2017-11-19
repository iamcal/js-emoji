describe("Fallbacks", function(){

	var emoji = new EmojiConvertor();

	emoji.img_sets.apple.path = '/a/';
	emoji.img_sets.google.path = '/g/';
	emoji.img_sets.twitter.path = '/t/';
	emoji.img_sets.messenger.path = '/m/';

	emoji.img_sets.apple.sheet = '/a.png';
	emoji.img_sets.google.sheet = '/g.png';
	emoji.img_sets.twitter.sheet = '/t.png';
	emoji.img_sets.messenger.sheet = '/m.png';

	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	it("falls back correctly with images", function(){

		emoji.use_sheet = false;

		// only apple, google and twitter have the gendered versions
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_image_cp_path('1f473-200d-2642-fe0f', '/a/'));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_image_cp_path('1f473-200d-2640-fe0f', '/a/'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_image_cp_path('1f473-200d-2642-fe0f', '/g/'));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_image_cp_path('1f473-200d-2640-fe0f', '/g/'));

		// the first will use the old obsolete CP image path
		// the second will fallback to apple
		emoji.img_set = 'messenger';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_image_cp_path('1f473-200d-2642-fe0f', '/m/', '1f473'));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_image_cp_path('1f473-200d-2640-fe0f', '/a/'));

	});

	it("falls back correctly with sheets", function(){

		emoji.use_sheet = true;

		var obs_turban_pos	= '44.003634161114476% 8.025439127801333%';
		var man_turban_pos	= '42.00484554815264% 97.97092671108419%';
		var woman_turban_pos	= '42.00484554815264% 85.97819503331314%';

		// only apple, google and twitter have the gendered versions
		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2642-fe0f', '/a.png', man_turban_pos));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2640-fe0f', '/a.png', woman_turban_pos));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2642-fe0f', '/g.png', man_turban_pos));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2640-fe0f', '/g.png', woman_turban_pos));

		emoji.img_set = 'messenger';
		expect(emoji.replace_colons(':man_with_turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2642-fe0f', '/m.png', obs_turban_pos));
		expect(emoji.replace_colons(':woman-wearing-turban:')).toBe(emoji_sheet_cp_path('1f473-200d-2640-fe0f', '/m.png', woman_turban_pos));
	});

});

