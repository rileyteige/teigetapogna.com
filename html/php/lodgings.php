<?php
$lodgingsXml = simplexml_load_file('../data/lodgings.xml');
$lodgings = array();

foreach($lodgingsXml as $lodging) {
	$name = (string)$lodging->name;
	$url = (string)$lodging->url;
	$image = (string)$lodging->image;
	$phone = (string)$lodging->phone;
	$address = $lodging->address;
	$extras = (string)$lodging->extras;
	$directions = (string)$lodging->directions;
	$drive = (string)$lodging->drive;
	array_push($lodgings, array('name' => $name,
					'url' => $url,
					'image' => $image,
					'phone' => $phone,
					'address' => $address,
					'extras' => $extras,
					'directions' => $directions,
					'drive' => $drive));
}

echo json_encode($lodgings);
?>