function emoji_span(codepoint){
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)"></span>';
}

describe("Emoticons replacer", function(){

	emoji.img_set = 'apple';
	emoji.img_sets.apple.path = '/';
	emoji.use_css_imgs = false;
	emoji.colons_mode = false;
	emoji.text_mode = false;
	emoji.include_title = false;
	emoji.allow_native = false;
	emoji.use_sheet = false;
	emoji.avoid_ms_emoji = true;

	describe('replace_emoticons', function() {

		it("replaces emoticons with markup", function(){

			// simple
			expect(emoji.replace_emoticons(':)')).toBe(emoji_span('1f60a'));

			// multiple emoticons that map to a single emoji
			expect(emoji.replace_emoticons(':p' )).toBe(emoji_span('1f61b'));
			expect(emoji.replace_emoticons(':-p')).toBe(emoji_span('1f61b'));
			expect(emoji.replace_emoticons(':P' )).toBe(emoji_span('1f61b'));
			expect(emoji.replace_emoticons(':-P')).toBe(emoji_span('1f61b'));
			expect(emoji.replace_emoticons(':b' )).toBe(emoji_span('1f61b'));
			expect(emoji.replace_emoticons(':-b')).toBe(emoji_span('1f61b'));

			// over-escaped emoticons
			expect(emoji.replace_emoticons(':\\')).toBe(emoji_span('1f615'));
		});

		it("does not replace emoticon-like strings", function(){
			var sunglasses = emoji_span('1f60e');
			var blush = emoji_span('1f60a');

			// look for parentheticals
			expect(emoji.replace_emoticons('(foo 8)')).toBe('(foo 8)');
			expect(emoji.replace_emoticons('8) () 8)')).toBe(sunglasses+' () '+sunglasses);
			expect(emoji.replace_emoticons('8) ) 8)')).toBe(sunglasses+' ) '+sunglasses);
			expect(emoji.replace_emoticons('8) ( 8)')).toBe(sunglasses+' ( 8)');
			expect(emoji.replace_emoticons('8) :) (foo 8) 8)')).toBe(sunglasses+' '+blush+' (foo 8) '+sunglasses);
			expect(emoji.replace_emoticons('(foo :) )')).toBe('(foo '+blush+' )');
			expect(emoji.replace_emoticons('(foo 8) ) (foo :) )')).toBe('(foo '+sunglasses+' ) (foo '+blush+' )');

			// numbered lists
			expect(emoji.replace_emoticons('7) seven\n8) eight')).toBe('7) seven\n8) eight');
			expect(emoji.replace_emoticons('6) six\n7) seven\n8) eight')).toBe('6) six\n7) seven\n8) eight');
			expect(emoji.replace_emoticons('6) six\n7) seven\n8) eight\n9) nine')).toBe('6) six\n7) seven\n8) eight\n9) nine');
			expect(emoji.replace_emoticons('6) six\n8) eight')).toBe('6) six\n8) eight');
		});

	});

	describe('replace_emoticons_with_colons', function() {

		it("replaces emoticons with colons", function(){

			expect(emoji.replace_emoticons_with_colons('i &lt;3 u')).toBe('i :heart: u');
		});

		it("does not replace emoticon-like strings", function(){

			// look for parentheticals
			expect(emoji.replace_emoticons_with_colons('(foo 8)')).toBe('(foo 8)');
			expect(emoji.replace_emoticons_with_colons('8) () 8)')).toBe(':sunglasses: () :sunglasses:');
			expect(emoji.replace_emoticons_with_colons('8) ) 8)')).toBe(':sunglasses: ) :sunglasses:');
			expect(emoji.replace_emoticons_with_colons('8) ( 8)')).toBe(':sunglasses: ( 8)');
			expect(emoji.replace_emoticons_with_colons('8) :) (foo 8) 8)')).toBe(':sunglasses: :blush: (foo 8) :sunglasses:');
			expect(emoji.replace_emoticons_with_colons('(foo :) )')).toBe('(foo :blush: )');
			expect(emoji.replace_emoticons_with_colons('(foo 8) ) (foo :) )')).toBe('(foo :sunglasses: ) (foo :blush: )');

			// numbered lists
			expect(emoji.replace_emoticons_with_colons('7) seven\n8) eight')).toBe('7) seven\n8) eight');
			expect(emoji.replace_emoticons_with_colons('6) six\n7) seven\n8) eight')).toBe('6) six\n7) seven\n8) eight');
			expect(emoji.replace_emoticons_with_colons('6) six\n7) seven\n8) eight\n9) nine')).toBe('6) six\n7) seven\n8) eight\n9) nine');
			expect(emoji.replace_emoticons_with_colons('6) six\n8) eight')).toBe('6) six\n8) eight');
		});

	});

});

