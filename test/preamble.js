// define our own class that we want to have preserved

function EmojiConvertor(){
	var self = this;
	self.foo = 'bar';
	return self;
}

function emoji_span(codepoint, text){
	if (!text) text = '';
	return '<span class="emoji emoji-sizer" style="background-image:url(/'+codepoint+'.png)" data-codepoints="'+codepoint+'">'+text+'</span>';
}
