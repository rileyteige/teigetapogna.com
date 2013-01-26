<?php

require_once 'sql.php';

function http_get_request_body() {
	return @file_get_contents('php://input');
}

function isStringNullOrEmpty($str) {
	return $str == null || $str == '';
}

function postQuestion($name, $content) {
	$link = getMySqlLink();

	$query = "
	insert into Question(name, content)
	values ('$name', '$content')
	";
	
	$link->query($query);
	
	$maxset = $link->query("select max(id) as id from Question");
	$max = $maxset->fetch_assoc();
	
	$link->close();
	
	return $max;
}

function postAnswer($id, $content) {
	$link = getMySqlLink();
	
	$query = "
	insert into Answer(id, content)
	values ('$id', '$content')
	";
	
	$link->query($query);
	
	$link->close();
}

function loadAllQuestions() {
	$link = getMySqlLink();
	
	$query = "
	select a.id, a.name, a.content as question, b.content as answer
	from Question a
	left join Answer b
	on a.id = b.id
	order by a.id
	";
	
	$questions = array();
	
	$result = $link->query($query);
	while ($row = $result->fetch_assoc()) {		
		$id = $row['id'];
		$name = $row['name'];
		$question = $row['question'];
		$answer = $row['answer'];
		if ($answer == null)
			$answer = '';
		
		array_push($questions, array( 'id' => $id,
										'name' => $name,
										'question' => $question,
										'answer' => $answer
									)
		);
	}
	
	$link->close();
	
	return $questions;
}

$request = $_SERVER['REQUEST_METHOD'];

if ($request === 'POST') {
	$body = http_get_request_body();
	if ($body != null) {
		$typeCheck = json_decode($body);
		switch ($typeCheck->type) {
		
			/* posing a question */
			case 'question': {
				$inQuestion = $typeCheck->obj;
				if ($inQuestion != null) {
					if (isStringNullOrEmpty($inQuestion->name)) {
						echo 'NULL NAME';
						exit();
					}
					
					if (isStringNullOrEmpty($inQuestion->content)) {
						echo 'BAD CONTENT';
						exit();
					}
					
					$question = postQuestion($inQuestion->name, $inQuestion->content);
					echo json_encode($question);
				}
			} break;
		
			/* answering a question */
			case 'answer': {
				$inAnswer = $typeCheck->obj;
				if ($inAnswer != null) {
					if (isStringNullOrEmpty($inAnswer->id)) {
						echo 'BAD ANSWER ID';
						exit();
					}
					
					if (isStringNullOrEmpty($inAnswer->content)) {
						echo 'BAD ANSWER CONTENT';
						exit();
					}
					
					postAnswer((int)$inAnswer->id, $inAnswer->content);
				}
			} break;
		
		}
	}
}

if ($request === 'GET') {
	$questions = loadAllQuestions();
	echo json_encode($questions);
}

?>