<?php
	# Gets the input
	$inData = getRequestInfo();

	if($inData["login"] == NULL || $inData["password"] == NULL)
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

	# Writes the sql statement to select the user
	$stmt = $conn->prepare("SELECT ID,firstName,lastName,dateLastLoggedIn FROM Users WHERE Login=? AND Password=?");
	$stmt->bind_param("ss", $inData["login"], $inData["password"]);
	$stmt->execute();
	$result = $stmt->get_result();

	if($row = $result->fetch_assoc())
		returnWithInfo($row["firstName"], $row["lastName"], $row["dateLastLoggedIn"], $row["ID"]);
	else
		returnWithError("No Records Found");

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
	
	function returnWithInfo($firstName, $lastName, $lastlogin, $id)
	{
		$retValue = '{"id":' .$id. ',"firstName":"' .$firstName. '","lastName":"' .$lastName. '", "lastLogin":"' .$lastlogin. '","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
