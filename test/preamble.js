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

function emoji_unified(cp){
	if (cp < 0x10000) return String.fromCharCode(cp);
	var h = Math.floor((cp - 0x10000) / 0x400) + 0xD800;
	var l = ((cp - 0x10000) % 0x400) + 0xDC00;
	return String.fromCharCode(h) + String.fromCharCode(l);
}
