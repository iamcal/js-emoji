<?
	$in = file_get_contents('emoji-data/emoji.json');
	$d = json_decode($in, true);


	#
	# build the catalog
	#

	$out = array();

	foreach ($d as $row){
		list($key) = explode('.', $row['image']);
		$out[$key] = array(
			calc_bytes($row['unified']),
			calc_bytes($row['softbank']),
			calc_bytes($row['google']),
			$row['short_names'],
		);
		if ($row['text']) $out[$key][] = $row['text'];
	}

	$json = pretty_print_json($out);

	$template = file_get_contents('emoji.js.template');
	echo str_replace('#DATA#', $json, $template);


	#
	# turn 0+ codepoints into a JS string
	#

	function calc_bytes($codes){
		if (!$codes) return '';
		$out = '';
		$codes = explode('-', $codes);
		foreach ($codes as $code){
			$out .= format_codepoint($code);
		}
		return $out;
	}


	#
	# turn a hex codepoint into a JS string
	#

	function format_codepoint($hex){

		$code = hexdec($hex);

		# simple codepoint
		if ($code <= 0xFFFF) return "\\u".sprintf('%04X', $code);

		# surrogate pair
		$code -= 0x10000;
		$byte1 = 0xD800 | (($code >> 10) & 0x3FF);
		$byte2 = 0xDC00 | ($code & 0x3FF);

		return "\\u".sprintf('%04X', $byte1)."\\u".sprintf('%04X', $byte2);
	}


	#
	# print one emoji per line to make diffs easier
	#

	function pretty_print_json($obj){
		$buffer = "{\n";
		foreach ($obj as $k => $v){
			$ve = json_encode($v);
			$ve = str_replace('\\\\u', '\\u', $ve);

			$buffer .= json_encode($k).':'.$ve.",\n";
		}
		$buffer = substr($buffer, 0, -2)."\n}";
		return $buffer;
	}
