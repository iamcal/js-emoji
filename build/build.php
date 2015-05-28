<?
	$in = file_get_contents('emoji-data/emoji.json');
	$d = json_decode($in, true);


	#
	# build the catalog
	#

	$out = array();
	$text_out = array();

	foreach ($d as $row){
		$has_imgs_bits = calc_img_has($row);
		$has_skins = count($row['skin_variations']) ? 1 : 0;

		list($key) = explode('.', $row['image']);
		$out[$key] = array(
			array(calc_bytes($row['unified'])),
			calc_bytes($row['softbank']),
			calc_bytes($row['google']),
			$row['short_names'],
			$row['sheet_x'],
			$row['sheet_y'],
			$has_imgs_bits,
			$has_skins,
		);
		if ($row['text']){
			$out[$key][] = $row['text'];
		}
		if (count($row['texts'])){
			foreach ($row['texts'] as $txt){
				$text_out[$txt] = $row['short_name'];
			}
		}
		if (count($row['variations'])){
			foreach ($row['variations'] as $var){
				array_unshift($out[$key][0], calc_bytes($var));
			}
		}
	}

	$json = pretty_print_json($out);
	$json2 = pretty_print_json($text_out);


	#
	# calc sheet size
	#

	$max = 0;

	foreach ($d as $row){

		$max = max($max, $row['sheet_x']);
		$max = max($max, $row['sheet_y']);

		if (count($row['skin_variations'])){
			foreach ($row['skin_variations'] as $row2){
				$max = max($max, $row2['sheet_x']);
				$max = max($max, $row2['sheet_y']);
			}
		}
	}

	$sheet_size = $max + 1;


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

	function calc_img_has($row){
		$has_imgs_bits = 0;
		if ($row['has_img_apple']) $has_imgs_bits |= 1;
		if ($row['has_img_google']) $has_imgs_bits |= 2;
		if ($row['has_img_twitter']) $has_imgs_bits |= 4;
		if ($row['has_img_emojione']) $has_imgs_bits |= 8;
		return $has_imgs_bits;
	}
