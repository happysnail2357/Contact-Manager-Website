<?php
	# Gets the input
	$inData = getRequestInfo();
	
	# Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	
	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
		return;
	}

	# Checks to see if the any of the required fields are null
	
	# Checks if the login already exists
	$stmt = $conn->prepare("SELECT ID FROM Users WHERE LOGIN=?");
	$stmt->bind_param("s", $inData["login"]);
	$stmt->execute();
	$stmt->store_result();
	
	if($stmt->num_rows > 0)
	{
		returnWithError("A user with that login already exists.");
		$stmt->close();
		$conn->close();
		return;
	}

	$stmt->close();
	
	# Writes the sql statement to insert the user into the database
	$stmt = $conn->prepare("INSERT into Users (Login,Password, firstName,lastName) VALUES(?, ?, ?, ?)");
	$stmt->bind_param("ssss", $inData["login"], $inData["password"], $inData["firstName"], $inData["lastName"]);

	try
	{
		$stmt->execute();
	}catch(Exception $e)
	{
		// returnWithError("in catch");
		// returnWithError("indata = " .implode(', ', $inData));
		returnWithError($e->getMessage());
		return;
	}
	
	$stmt->store_result();

	// returnWithError("here");
	
	if($stmt->affected_rows > 0)
		returnWithInfo("The user was added to the database.");
	else
		returnWithError("The user was not able to be added to the database.");

	$stmt->close();
	$conn->close();

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"error":"' .$err. '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($msg)
	{
		$retValue = '{"msg":"' .$msg. '","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
