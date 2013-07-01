<?php
$itineraryXml = simplexml_load_file('../content/data/itinerary.xml');
$itinerary = array();

function makeEvent($event) {
	return array('title' => (string)$event->title,
				'time' => (string)$event->time,
				'location' => (string)$event->location);
}

function makeDate($month, $day, $year) {
	return array('month' => (string)$month,
				'day' => (string)$day,
				'year' => (string)$year);
}

function makeItineraryDay($date) {
	$dateDict = makeDate($date['month'], $date['day'], $date['year']);

	$events = array();

	foreach ($date->event as $eventXml) {
		array_push($events, makeEvent($eventXml));
	}

	return array('date' => $dateDict,
				'events' => $events);
}

foreach ($itineraryXml as $dateXml) {
	array_push($itinerary, makeItineraryDay($dateXml));
}

echo json_encode($itinerary);
?>