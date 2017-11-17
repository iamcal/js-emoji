<?php
	error_reporting(E_ALL & ~E_NOTICE);

	$dir = dirname(__FILE__);
	$in = file_get_contents($dir.'/emoji-data/emoji.json');
	$d = json_decode($in, true);


	#
	# bit masks for various sets
	#

	$set_masks = array(
		'apple'		=> 1,
		'google'	=> 2,
		'twitter'	=> 4,
		'emojione'	=> 8,
		'facebook'	=> 16,
		'messenger'	=> 32,
	);


	#
	# build the catalog
	#

	$out = array();
	$vars_out = array();
	$text_out = array();
	$obsoletes = array();

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
		if ($row['non_qualified']){
			$out[$key][0][] = calc_bytes($row['non_qualified']);
		}
		if (count($row['skin_variations'])){

			foreach ($row['skin_variations'] as $k2 => $row2){

				list($sub_key) = explode('.', $row2['image']);

				$vars_out[$key][StrToLower($k2)] = array(
					$sub_key,
					$row2['sheet_x'],
					$row2['sheet_y'],
					calc_img_has($row2),
					array(calc_bytes($row2['unified'])),
				);
			}
		}

		if ($row['obsoleted_by']){
			$new_key = StrToLower($row['obsoleted_by']);
			$obsoletes[$key] = $new_key;
		}
	}


	#
	# build the obsoletes map
	#
	# new_key => [old_key, sheet_x, sheet_y, bit_mask]
	#

	$obs_map = array();

	foreach ($obsoletes as $old_key => $new_key){

		$obs_map[$new_key] = array(
			$old_key,
			$out[$old_key][4],
			$out[$old_key][5],
			$out[$old_key][6],
		);

		if (is_array($vars_out[$old_key])){
			foreach ($vars_out[$old_key] as $k => $old_row){

				$new_row = $vars_out[$new_key][$k];

				$obs_map[$new_row[0]] = array(
					$old_row[0],
					$old_row[1],
					$old_row[2],
					$old_row[3],
				);
			}
		}
	}


	#
	# merge obsoletes with their new versions
	#

	foreach ($obsoletes as $old_key => $new_key){

		$out[$new_key][0] = array_unique(array_merge($out[$new_key][0], $out[$old_key][0])); # codepoints
		$out[$new_key][3] = array_unique(array_merge($out[$new_key][3], $out[$old_key][3])); # shortnames

		if (is_array($vars_out[$new_key])){
			foreach ($vars_out[$new_key] as $k => $v){
				# this might not be defined. in some cases a non-skin-tone
				# emoji was replaced with a new skin-tone aware version
				if (is_array($vars_out[$old_key][$k][4])){
					$vars_out[$new_key][$k][4] = array_unique(array_merge($vars_out[$new_key][$k][4], $vars_out[$old_key][$k][4]));
				}
			}
		}


		unset($out[$old_key]);
		unset($vars_out[$old_key]);
	}


	$json = pretty_print_json($out);
	$json_vars = pretty_print_json($vars_out);
	$json_text = pretty_print_json($text_out);
	$obs_map = pretty_print_json($obs_map);


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
	# format list of sets
	#

	$sets = array();
	foreach ($set_masks as $k => $v){
		$sets[] = "\t\t\t'{$k}' : {'path' : '/emoji-data/img-{$k}-64/', 'sheet' : '/emoji-data/sheet_{$k}_64.png', 'sheet_size' : 64, 'mask' : $v},";
	}
	$sets = implode("\n", $sets);


	#
	# output
	#

	$template = file_get_contents($dir.'/emoji.js.template');

	$map = array(
		'#SHEET-SIZE#'	=> $sheet_size,
		'#DATA#'	=> $json,
		'#DATA-TEXT#'	=> $json_text,
		'#DATA-VARS#'	=> $json_vars,
		'#SETS#'	=> $sets,
		'#OBS-MAP#'	=> $obs_map,
	);

	echo str_replace(array_keys($map), array_values($map), $template);


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
		foreach ($GLOBALS['set_masks'] as $k => $v){
			if ($row['has_img_'.$k]) $has_imgs_bits |= $v;
		}
		return $has_imgs_bits;
	}
