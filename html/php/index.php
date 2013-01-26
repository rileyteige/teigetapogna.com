<?php

$images = array_filter(scandir('../images'), function($item) {
	return !(strpos($item, ".jpg") === false) && strpos($item, ".") > 0;
});

echo json_encode($images);

?>