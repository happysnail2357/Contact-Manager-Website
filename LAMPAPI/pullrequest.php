<?php
	# Gets the input
	$inData = getRequestInfo();
	
	$output = shell_exec('bash /git/apply.sh');
	
	returnWithInfo($output);
	
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
	
	function returnWithInfo($info)
	{
		$retValue = '{"result":' .$info. '}';
		sendResultInfoAsJson($retValue);
	}
	
	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>