<?php
	#
	# build a map of codepoint sequences to files
	#

	$dir = dirname(__FILE__).'/gemoji/images/emoji/unicode';

	$files = array();

	$dh = opendir($dir);
	while (($file = readdir($dh)) !== false){
		if (preg_match('!\.png$!', $file)){

			$key = StrToUpper(pathinfo($file, PATHINFO_FILENAME));
			if (preg_match('!^00(..)$!', $key)) $key = substr($key, 2, 2)."-20E3";

			$files[$key] = $file;
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

		$chars = array();
		foreach ($row['unicode'] as $c) $chars[] = sprintf('%X', $c);
		$key = implode('-', $chars);

		$file = $files[$key];
		if (!$file) $file = $files['2754']; # fallback to white-question-mark-ornament

		$name = StrToLower(str_replace(' ', '-', $row['char_name']['title']));

		echo ".emoji-{$name}{background-image: url(emoji/{$file})}\n";
	}
