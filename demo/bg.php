<?php
	# var sheet_x = 100 * img.px / (self.sheet_size - 1);
	# var sheet_y = 100 * img.py / (self.sheet_size - 1);
	# var sheet_sz = 100 * self.sheet_size;

	$img_px = 32;
	$img_py = 26;

	$sheet_size = 52;

	$sheet_x = 100 * $img_px / ($sheet_size - 1);
	$sheet_y = 100 * $img_py / ($sheet_size - 1);
	$sheet_sz = 100 * $sheet_size;
?>
<style>

div {
	width: 128px;
	height: 128px;
	background: url(/js-emoji/build/emoji-data/sheet_google_64.png);
	background-position: <?=$sheet_x?>% <?=$sheet_y?>%;
	background-size: <?=$sheet_sz?>% <?=$sheet_sz?>%;
	background-origin: content-box;
}

</style>

<div style="background-color: pink"></div>
