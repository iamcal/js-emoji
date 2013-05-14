<?php
	$json = file_get_contents((dirname(__FILE__).'/emoji-data/emoji.json'));
	$catalog = json_decode($json, true);


	#
	# dump header
	#

	$lines = file('emoji.css.template');
	echo implode('', $lines);


	#
	# write rules
	#

	foreach ($catalog as $row){

		list($name) = explode('.', $row['image']);
		echo ".emoji-{$name}{background-image: url(emoji/{$row['image']})}\n";
	}
