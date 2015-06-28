<?
	error_reporting(E_ALL & ~E_NOTICE);

	$dir = dirname(__FILE__);
	$in = file_get_contents($dir.'/emoji-data/emoji.json');
	$d = json_decode($in, true);


	#
	# build the catalog
	#

	$out = array();
	$vars_out = array();
	$text_out = array();

	foreach ($d as $row){

		list($key) = explode('.', $row['image']);
		$out[$key] = array(
			array(calc_bytes($row['unified'])),
			calc_bytes($row['softbank']),
			calc_bytes($row['google']),
			$row['short_names'],
			$row['sheet_x'],
			$row['sheet_y'],
			calc_img_has($row),
			0,
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
		if (count($row['skin_variations'])){
			foreach ($row['skin_variations'] as $row2){

				list($key) = explode('.', $row2['image']);

				$vars_out[$key] = array(
					$row2['sheet_x'],
					$row2['sheet_y'],
					calc_img_has($row2),
				);
			}
		}
	}

	$json = pretty_print_json($out);
	$json_vars = pretty_print_json($vars_out);
	$json_text = pretty_print_json($text_out);


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

	$template = file_get_contents($dir.'/emoji.js.template');
	echo str_replace(array('#SHEET-SIZE#', '#DATA#', '#DATA-TEXT#', '#DATA-VARS#'), array($sheet_size, $json, $json_text, $json_vars), $template);


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
