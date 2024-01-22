<?php
    # Gets the input
    $inData = getRequestInfo();

    # Query Parameter
    $id = $inData["id"];

    # Data to be entered into the table
    $firstName = NULL;
    $lastName = NULL;
    $phone = NULL;
    $email = NULL;
    $address = NULL;
    $age = 0;
    $birthday = NULL;
    $emoji = NULL;
    $userId = $inData["userId"];

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
    $stmt->bind_param("s", $id);

    $stmt->execute();

    $result = $stmt->get_result();
    
    if($result->num_rows == 0)
    {
        returnWithError("The contact you are trying to update cannot be found.");
        return;
    }
    
    # Gets the updated fields
    $row = $result->fetch_assoc();

    if(array_key_exists("firstName", $inData))
        $firstName = $inData["firstName"];
    else
        $firstName = $row["FirstName"];

    if(array_key_exists("lastName", $inData))
        $lastName = $inData["lastName"];
    else
        $lastName = $row["LastName"];

    if(array_key_exists("phone", $inData))
        $phone = $inData["phone"];
    else
        $phone = $row["Phone"];
    
    if(array_key_exists("email", $inData))
        $email = $inData["email"];
    else
        $email = $row["Email"];

    if(array_key_exists("address", $inData))
        $address = $inData["address"];
    else
        $address = $row["Address"];

    if(array_key_exists("age", $inData))
        $age = $inData["age"];
    else
        $age = $row["Age"];

    if(array_key_exists("birthday", $inData))
        $birthday = $inData["birthday"];
    else
        $birthday = $row["Birthday"];

    if(array_key_exists("emoji", $inData))
        $emoji = $inData["emoji"];
    else
        $emoji = $row["Emoji"];
    
    # Updates the contact with the updated fields
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=?, Address=?, Age=?, Birthday=?, Emoji=? WHERE ID=?");
    $stmt->bind_param("sssssissi", $firstName, $lastName, $phone, $email, $address, $age, $birthday, $emoji, $id);

    $stmt->execute();
    $stmt->store_result();
        
    if($stmt->affected_rows > 0)
        returnWithInfo("The contact was updated!.");
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