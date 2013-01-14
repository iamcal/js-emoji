<?
	$in = file_get_contents('emoji.json');
	$d = json_decode($in, true);


	#
	# build a replacement map (JS String -> class name)
	#

	$map = array();

	foreach ($d as $cat => $codes){

		foreach ($codes as $row){

			$src = preg_replace_callback('!&#x([0-9a-f]+);!', 'replace_codepoint', $row[0]);
			$class = str_replace(' ', '-', StrToLower($row[1]));
			$map[$src] = $class;
		}
	}


	#
	# output the JS
	#

	$rx = array();
	foreach ($map as $k => $v) $rx[] = str_replace("\\", "\\\\", $k);
	$rx = '('.implode('|', $rx).')';

	echo "var emoji = {\n";
	echo "rx: new RegExp(\"$rx\", \"g\"),\n";
	echo "map: {\n";
	foreach ($map as $k => $v){
		echo "\"$k\":\"$v\",\n";
	}
	echo "},\n";
	echo "replace: function(str){\n";
	echo "  return str.replace(emoji.rx, function(m){ return '<span class=\"emoji-'+emoji.map[m]+'\">'+m+'</span>'; });\n";
	echo "}\n";
	echo "};\n";



	#
	# turn a hex codepoint into a JS string
	#

	function replace_codepoint($m){

		$code = hexdec($m[1]);

		# simple codepoint
		if ($code <= 0xFFFF) return "\\u".sprintf('%04X', $code);

		# surrogate pair
		$code -= 0x10000;
		$byte1 = 0xD800 | (($code >> 10) & 0x3FF);
		$byte2 = 0xDC00 | ($code & 0x3FF);

		return "\\u".sprintf('%04X', $byte1)."\\u".sprintf('%04X', $byte2);
	}
