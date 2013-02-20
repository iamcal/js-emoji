<?php
	#
	# decode original css map
	#

	$lines = file('css.txt');

	$map = array();
	foreach($lines as $line){

		if (preg_match('!\.(E[0-9A-F]{3}) \{ background-position\: 0px (-?\d+)px!', $line, $m)){

			$map[hexdec($m[1])] = $m[2];
		}
	}


	#
	# dump header
	#

	$lines = file('emoji.css.template');
	echo implode('', $lines);


	#
	# load catalog
	#

	include('catalog.php');

	foreach ($catalog as $row){

		$code = $row['softbank']['unicode'][0];
		$offset = (isset($map[$code])) ? $map[$code] : -9200;

		$name = StrToLower(str_replace(' ', '-', $row['char_name']['title']));

		echo ".emoji-{$name}{background-position:0 {$offset}px}\n";
	}
