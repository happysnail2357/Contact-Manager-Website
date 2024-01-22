<?php
	# Gets the input
	$inData = getRequestInfo();

	# Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		# Writes the sql statement to select the user
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
		$stmt->bind_param("s", $inData["login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if($row = $result->fetch_assoc())
		{
			returnWithError("Username already exists.");
		}
		else
		{
			returnWithInfo(true);
		}

		$stmt->close();
		$conn->close();
	}
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
		$retValue = '{"exists":false,"error":"' .$err. '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($exists)
	{
		$retValue = '{"exists":' .$exists. '"error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
