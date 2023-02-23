<?php

$getHeaders = getallheaders();

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: '.$getHeaders["origin"]);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, HEAD');


$input = json_decode(file_get_contents("php://input"), true);


function send_forward($inputJSON, $link){
	
$request = 'POST';	
		
$descriptor = curl_init($link);

 curl_setopt($descriptor, CURLOPT_POSTFIELDS, $inputJSON);
 curl_setopt($descriptor, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt($descriptor, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
 curl_setopt($descriptor, CURLOPT_CUSTOMREQUEST, $request);

    $itog = curl_exec($descriptor);
    curl_close($descriptor);

   		 return $itog;
		
}


$send["web_app_query_id"] = $input["queryId"];
$send["result"]["type"] = "article";
$send["result"]["id"] = 345678;
$send["result"]["title"] = "testTitle";
$send["result"]["input_message_content"]["message_text"] = $input["message"];

$tgUrl = "https://api.telegram.org/bot5392388068:AAHQKxxZ6UqTwgP3obdfbr2GbM0Ux5yKpG0/answerWebAppQuery";

$result["send"] = $send;
$result["result"] = json_decode(send_forward(json_encode($send), $tgUrl), true);

echo json_encode($result);








