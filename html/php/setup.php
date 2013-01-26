<?php

require_once 'sql.php';

$link = getMySqlLink();

/* check connection */
if (mysqli_connect_errno()) {
	echo "Connect failed.";
	exit();
}

$question_query = "
	create table Question (
		id int not null auto_increment,
		name varchar(64) not null,
		content varchar(2048) not null,
		primary key (id)
	)
";

$answer_query = "
	create table Answer (
		id int not null,
		content varchar(2048) not null,
		primary key (id)
	)
";

if (!$link->query($question_query)) {
	echo "Question query failed.";
	exit();
}

$link->query($answer_query);

$link->close();

?>