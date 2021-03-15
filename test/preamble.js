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

function emoji_image_cp_path(cp, path, img_cp){
	if (!img_cp) img_cp = cp;
	return '<span class="emoji emoji-sizer" style="background-image:url('+path+img_cp+'.png)" data-codepoints="'+cp+'"></span>';
}

function emoji_sheet_cp_path(cp, path, b_pos){
	var bg_size = '5700%';
	return '<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="background: url('+path+');background-position:'+b_pos+';background-size:'+bg_size+' '+bg_size+'" data-codepoints="'+cp+'"></span></span>';
}
