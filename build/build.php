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
			array(calc_bytes($row['unified'])),
			calc_bytes($row['softbank']),
			calc_bytes($row['google']),
			$row['short_names'],
			$row['sheet_x'],
			$row['sheet_y'],
		);
		if ($row['text']) $out[$key][] = $row['text'];
		if (count($row['variations'])){
			foreach ($row['variations'] as $var){
				array_unshift($out[$key][0], calc_bytes($var));
			}
		}
	}

	$json = pretty_print_json($out);


	#
	# calc sheet size
	#

	$max = 0;

	foreach ($d as $row){

		$max = max($max, $row['sheet_x']);
		$max = max($max, $row['sheet_y']);
	}

	$sheet_size = $max + 1;;


	#
	# build the emoticons mapping
	#

	$lines = file('emoji-data/build/catalog_text_toemoji.txt');
	$text = array();
	foreach ($lines as $line){
		$line = trim($line);
		if (strlen($line)){
			$bits = preg_split('!\s+!', $line, 2);
			$text[$bits[0]] = $bits[1];
		}
	}

	$json2 = pretty_print_json($text);


	#
	# output
	#

	$template = file_get_contents('emoji.js.template');
	echo str_replace(array('#SHEET-SIZE#', '#DATA#', '#DATA2#'), array($sheet_size, $json, $json2), $template);


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

	function pretty_print_json($obj, $pad="\t"){
		$buffer = "{\n";
		foreach ($obj as $k => $v){
			$ve = json_encode($v);
			$ve = str_replace('\\\\u', '\\u', $ve);

			$buffer .= $pad.$pad.json_encode("".$k).':'.$ve.",\n";
		}
		$buffer = substr($buffer, 0, -2)."\n{$pad}}";
		return $buffer;
	}
