<?php
	# Gets the input
	$inData = getRequestInfo();

	# Checks to see if the any of the required fields are null

	if($inData['login'] == NULL || $inData['password'] == NULL || $inData['firstName'] == NULL || $inData['lastName'] == NULL)
	{
		returnWithError("Missing required field(s).");
		return;
	}

	# Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	
	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
		return;
	}
	
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
	$stmt->execute();
	$stmt->store_result();
	
	if($stmt->affected_rows <= 0)
		returnWithError("The user could not be created.");
	else
		returnWithInfo($inData["login"], $inData["password"], $conn->insert_id);

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
	
	function returnWithInfo($firstName, $lastName, $id)
	{
		$retValue = '{"id":' .$id. ',"firstName":"' .$firstName. '","lastName":"' .$lastName. '", "error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
