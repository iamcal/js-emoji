describe("noConflict mode", function(){

	it("overwrites the previous class", function(){

		var emoji = new EmojiConvertor();
		expect(emoji.img_set).toBe('apple');
	});

	it("replaces the previous class", function(){

		var emoji = new EmojiConvertor();
		var lib_class = emoji.noConflict();

		var emoji2 = new EmojiConvertor();
		expect(emoji2.foo).toBe('bar');

		var emoji3 = new lib_class();
		expect(emoji3.img_set).toBe('apple');
	});
});

