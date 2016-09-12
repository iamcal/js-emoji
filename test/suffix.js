describe("Allows cache-busting suffixes", function(){

	var emoji = new EmojiConvertor();

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.img_sets.apple.sheet = '/sheet.png';
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	emoji.supports_css = false;
	emoji.use_sheet = false;
	emoji.use_css_imgs = false;

	it("For individual images", function(){

		emoji.img_suffix = '';
		expect(emoji.replace_colons(':cloud:')).toBe('<img src="/2601.png" class="emoji" data-codepoints="2601" />');

		emoji.img_suffix = '?FOO';
		expect(emoji.replace_colons(':cloud:')).toBe('<img src="/2601.png?FOO" class="emoji" data-codepoints="2601" />');
	});

});

