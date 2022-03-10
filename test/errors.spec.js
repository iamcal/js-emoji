
describe("Handles error conditions gracefully", function(){

	it("Notices bad values for emojiSet and related properties", function(){

		var emoji = new EmojiConvertor();

		emoji.img_set = 'fake';
		expect(function(){ emoji.replace_colons(':cloud:') }).toThrow(new Error("Invalid value for img_set"));
	});

});

