<?php

$images = array_filter(scandir('../content/images'), function($item) {
	return !(strpos($item, ".jpg") === false) && strpos($item, ".") > 0;
});

shuffle($images);

echo json_encode($images);

?>
