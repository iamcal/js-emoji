var emoji2 = new function(){
	var self = this;
	this.inits = {};
	this.map = {};
	this.text_mode = false;
	this.replace_colons = function(str){
		self.init_colons();
		return str.replace(self.rx_colons, function(m){
			var idx = m.substr(1, m.length-2);
			var val = self.map.colons[idx];
			return val ? self.replacement(val) : m;
		});
	};
	this.replacement = function(idx){
		if (self.text_mode){
			return emoji_data[idx][4] || ':'+emoji_data[idx][3]+':';
		}else{
			self.init_env();
			if (self.replace_mode == 'unified') return emoji_data[idx][0];
			if (self.replace_mode == 'softbank') return emoji_data[idx][1];
			if (self.replace_mode == 'google') return emoji_data[idx][2];
			return '<span class="emoji emoji-'+idx+'">:'+idx+':</span>';
		}
	};
	this.init_colons =  function(){
		if (self.inits.colons) return;
		self.inits.colons = 1;
		self.rx_colons = new RegExp('\:[^\\s:]+\:', 'g');
		self.map.colons = {};
		for (var i in emoji_data){
			self.map.colons[emoji_data[i][3]] = i;
		}
	};
	this.init_env = function(){
		if (self.inits.env) return;
		self.inits.env = 1;
		self.replace_mode = 'img';
		var ua = navigator.userAgent;
		if (ua.match(/(iPhone|iPod|iPad|iPhone\s+Simulator)/i)){
			if (ua.match(/OS\s+[12345]/i)) self.replace_mode = 'softbank';
			if (ua.match(/OS\s+[6789]/i)) self.replace_mode = 'unified';
		}
		if (ua.match(/Mac OS X 10[._ ][789]/i)) self.replace_mode = 'unified';
		if (ua.match(/Android/i)) self.replace_mode = 'google';	
	};
};
