describe("Aliases", function(){

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

	it("resolves aliases correctly", function(){

		expect(emoji.replace_colons(':doge:')).toBe(':doge:');
		expect(emoji.replace_colons(':aubergine:')).toBe(':aubergine:');

		emoji.addAliases({
			'doge'		: '1f415',
			'aubergine'	: '1f346'
		});

		expect(emoji.replace_colons(':doge:')).toBe(emoji_span('1f415'));
		expect(emoji.replace_colons(':aubergine:')).toBe(emoji_span('1f346'));

		emoji.removeAliases([
			'doge',
			'aubergine'
		]);

		expect(emoji.replace_colons(':doge:')).toBe(':doge:');
		expect(emoji.replace_colons(':aubergine:')).toBe(':aubergine:');
	});

	it("allows aliases to override builtins", function(){

		expect(emoji.replace_colons(':cat:')).toBe(emoji_span('1f431'));
		expect(emoji.replace_colons(':dog:')).toBe(emoji_span('1f436'));

		emoji.addAliases({
			'dog'	: '1f431',
			'cat'	: '1f436'
		});

		expect(emoji.replace_colons(':cat:')).toBe(emoji_span('1f436'));
		expect(emoji.replace_colons(':dog:')).toBe(emoji_span('1f431'));

		emoji.removeAliases([
			'dog',
			'cat'
		]);

		expect(emoji.replace_colons(':cat:')).toBe(emoji_span('1f431'));
		expect(emoji.replace_colons(':dog:')).toBe(emoji_span('1f436'));
	});
});

