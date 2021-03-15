
describe("Correctly supports different modes", function(){

	//console.log("modes", emoji.inits, emoji.supports_css, emoji.replace_mode);

	var emoji = new EmojiConvertor();

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.img_sets.apple.sheet = '/sheet.png';
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.avoid_ms_emoji = true;

	it("Uses spritesheets with CSS background-sizing support", function(){

		emoji.supports_css = true;
		emoji.use_sheet = true;
		emoji.use_css_imgs = false;

		expect(emoji.replace_colons(':cloud:')).toBe(emoji_sheet_cp_path('2601-fe0f', '/sheet.png', '92.85714285714286% 89.28571428571429%'));
	});

	it("Uses CSS classes with CSS background-sizing support", function(){

		emoji.supports_css = true;
		emoji.use_sheet = false;
		emoji.use_css_imgs = true;

		expect(emoji.replace_colons(':cloud:')).toBe('<span class="emoji emoji-2601-fe0f" data-codepoints="2601-fe0f"></span>');
	});

	it("Uses individual images with CSS background-sizing support", function(){

		emoji.supports_css = true;
		emoji.use_sheet = false;
		emoji.use_css_imgs = false;

		expect(emoji.replace_colons(':cloud:')).toBe('<span class="emoji emoji-sizer" style="background-image:url(/2601-fe0f.png)" data-codepoints="2601-fe0f"></span>');
	});

	it("Uses images without CSS background-sizing support", function(){

		emoji.supports_css = false;
		emoji.use_sheet = false;
		emoji.use_css_imgs = false;

		expect(emoji.replace_colons(':cloud:')).toBe('<img src="/2601-fe0f.png" class="emoji" data-codepoints="2601-fe0f" />');
	});

});

