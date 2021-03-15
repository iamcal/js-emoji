describe("Obsoletes", function(){

	var emoji = new EmojiConvertor();

	emoji.img_sets.apple.path = '/a/';
	emoji.img_sets.apple.sheet = '/a.png';

	emoji.img_sets.google.path = '/g/';
	emoji.img_sets.google.sheet = '/g.png';

	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	var ok_woman_pos	= '57.142857142857146% 19.642857142857142%';
	var ok_man_pos		= '57.142857142857146% 30.357142857142858%';

	it("converts unified to the new form", function(){

		var swimmer		= emoji_unified(0x1f3ca);
		var man_swimming	= emoji_unified(0x1f3ca)+emoji_unified(0x200d)+emoji_unified(0x2642)+emoji_unified(0xfe0f);

		var swimmer_s6		= emoji_unified(0x1f3ca)+emoji_unified(0x1f3ff);
		var man_swimming_s6	= emoji_unified(0x1f3ca)+emoji_unified(0x1f3ff)+emoji_unified(0x200d)+emoji_unified(0x2642)+emoji_unified(0xfe0f);

		emoji.colons_mode = true;

		expect(emoji.replace_unified(swimmer)).toBe(':man-swimming:');
		expect(emoji.replace_unified(man_swimming)).toBe(':man-swimming:');

		expect(emoji.replace_unified(swimmer_s6)).toBe(':man-swimming::skin-tone-6:');
		expect(emoji.replace_unified(man_swimming_s6)).toBe(':man-swimming::skin-tone-6:');
	});

	it("obsolete versions match (sheets)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = true;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));
	});

	it("obsolete versions match (images)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = false;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':man-swimming:')).toBe(emoji.replace_colons(':swimmer:'));
		expect(emoji.replace_colons(':man-swimming::skin-tone-6:')).toBe(emoji.replace_colons(':swimmer::skin-tone-6:'));
	});

	it("obsolete fallbacks work correctly (sheets)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = true;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:'          )).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2640-fe0f', '/a.png', ok_woman_pos));
		expect(emoji.replace_colons(':woman-gesturing-ok::skin-tone-4:')).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2640-fe0f', '/a.png', ok_woman_pos));
		expect(emoji.replace_colons(':man-gesturing-ok::skin-tone-4:'  )).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2642-fe0f', '/a.png', ok_man_pos));

		// this is not longer a super useful test, since we do fixups at the path level now,
		// so all obsolete emoji will have images
		emoji.img_set = 'google';
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:'          )).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2640-fe0f', '/g.png', ok_woman_pos));
		expect(emoji.replace_colons(':woman-gesturing-ok::skin-tone-4:')).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2640-fe0f', '/g.png', ok_woman_pos));
		expect(emoji.replace_colons(':man-gesturing-ok::skin-tone-4:'  )).toBe(emoji_sheet_cp_path('1f646-1f3fd-200d-2642-fe0f', '/g.png', ok_man_pos));
	});

	it("obsolete fallbacks work correctly (images)", function(){

		emoji.colons_mode = false;
		emoji.use_sheet = false;

		emoji.img_set = 'apple';
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:'          )).toBe(emoji_image_cp_path('1f646-1f3fd-200d-2640-fe0f', '/a/'));
		expect(emoji.replace_colons(':woman-gesturing-ok::skin-tone-4:')).toBe(emoji_image_cp_path('1f646-1f3fd-200d-2640-fe0f', '/a/'));
		expect(emoji.replace_colons(':man-gesturing-ok::skin-tone-4:'  )).toBe(emoji_image_cp_path('1f646-1f3fd-200d-2642-fe0f', '/a/'));

		emoji.img_set = 'google';
		expect(emoji.replace_colons(':ok_woman::skin-tone-4:'                )).toBe(emoji_image_cp_path('1f646-1f3fd-200d-2640-fe0f', '/g/', '1f646-1f3fd-200d-2640-fe0f')); // img path no longer differs from codepoints
		expect(emoji.replace_colons(':woman-gesturing-ok::skin-tone-4:'      )).toBe(emoji_image_cp_path('1f646-1f3fd-200d-2640-fe0f', '/g/', '1f646-1f3fd-200d-2640-fe0f')); // img path no longer differs from codepoints
		expect(emoji.replace_colons(':person_in_lotus_position::skin-tone-4:')).toBe(emoji_image_cp_path('1f9d8-1f3fd-200d-2640-fe0f', '/g/', '1f9d8-1f3fd-200d-2640-fe0f'));
	});

});

