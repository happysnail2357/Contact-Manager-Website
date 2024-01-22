<?php
    # Gets the input
    $inData = getRequestInfo();

    # Data to be inserted into the Contacts table
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $phone = NULL;
    $email = NULL;
    $address = NULL;
    $age = 0;
    $birthday = NULL;
    $emoji = NULL;
    $userId = $inData["userId"];

    # Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
    else
    {
        # Checks if any of the optional fields have been filled
        if(array_key_exists("phone", $inData))
            $phone = $inData["phone"];
        
        if(array_key_exists("email", $inData))
            $email = $inData["email"];
    
        if(array_key_exists("address", $inData))
            $address = $inData["address"];

        if(array_key_exists("age", $inData))
            $age = $inData["age"];

        if(array_key_exists("birthday", $inData))
            $birthday = $inData["birthday"];

        if(array_key_exists("emoji", $inData))
            $emoji = $inData["emoji"];

        # Writes the sql statement to insert the contact into the database
        $stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, Address, Age, Birthday, Emoji, UserID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssi", $firstName, $lastName, $phone, $email, $address, $age, $birthday, $emoji, $userId);
        
        $stmt->execute();
        $stmt->store_result();
        
        if($stmt->affected_rows > 0)
            returnWithInfo("The contact was added to the database.");
        else
            returnWithError("The contact was not able to be added to the database.");

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
		$retValue = '{"error":"' .$err. '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($msg)
	{
		$retValue = '{"msg":"' .$msg. '","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>