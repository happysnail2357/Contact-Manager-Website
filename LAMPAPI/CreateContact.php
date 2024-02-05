<?php
    # Gets the input
    $inData = getRequestInfo();

    if($inData["firstName"] == NULL || $inData["lastName"] == NULL || $inData["userId"] == NULL)
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

    # Writes the sql statement to insert the contact into the database
    $stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, Address, Age, Birthday, Emoji, UserID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssissi", $inData["firstName"], $inData["lastName"], $inData["phone"], $inData["email"], $inData["address"], $inData["age"], $inData["birthday"], $inData["emoji"], $inData["userId"]);
    
    $stmt->execute();
    $stmt->store_result();
    
    if($stmt->affected_rows <= 0)
		returnWithError("The contact could not be created.");
	else
		returnWithInfo($conn->insert_id, $inData["firstName"], $inData["lastName"], $inData["phone"], $inData["email"], $inData["address"], $inData["age"], $inData["birthday"], $inData["emoji"], $inData["userId"]);

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
	
	function returnWithInfo($id, $firstName, $lastName, $phone, $email, $address, $age, $birthday, $emoji, $userId)
	{
		
		$retValue = '{"id":' .$id. ', "firstName":"' .$firstName. '", "lastName":"' .$lastName. '", "phone":"' .$phone. '", "email":"' .$email. '", "address":"' .$address. '", "age":' .$age. ', "birthday":"' .$birthday. '", "emoji":"' .$emoji. '", "userId":' .$userId. '}';
		sendResultInfoAsJson($retValue);
	}
?>