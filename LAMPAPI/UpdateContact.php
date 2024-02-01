<?php
    # Gets the input
    $inData = getRequestInfo();

    if($inData["contactId"] == NULL)
	{
		returnWithError("Missing required field.");
		return;
	}

    # Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    # Halts if there is an error connecting to the database
	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
        return;
	}

    # Checks to see if the id exists
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID=?");
    $stmt->bind_param("s", $inData["contactId"]);

    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows == 0)
    {
        returnWithError("The contact you are trying to update cannot be found.");
        return;
    }
    
    # Gets the updated fields
    $row = $result->fetch_assoc();

    $firstName = $inData["firstName"] != NULL ? $inData["firstName"] : $row["FirstName"];
    $lastName = $inData["lastName"] != NULL ? $inData["lastName"] : $row["LastName"];
    $phone = $inData["phone"] != NULL ? $inData["phone"] : $row["Phone"];
    $email = $inData["email"] != NULL ? $inData["email"] : $row["Email"];
    $address = $inData["address"] != NULL ? $inData["address"] : $row["Address"];
    $age = $inData["age"] != NULL ? $inData["age"] : $row["Age"];
    $birthday = $inData["birthday"] != NULL ? $inData["birthday"] : $row["Birthday"];
    $emoji = $inData["emoji"] != NULL ? $inData["emoji"] : $row["Emoji"];
    
    # Updates the contact with the updated fields
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=?, Address=?, Age=?, Birthday=?, Emoji=? WHERE ID=?");
    $stmt->bind_param("sssssissi", $firstName, $lastName, $phone, $email, $address, $age, $birthday, $emoji, $inData["contactId"]);

    $stmt->execute();
    $stmt->store_result();
        
    if($stmt->affected_rows > 0)
        returnWithInfo("The contact was updated!");
    else
        returnWithError("The contact could not be updated.");

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