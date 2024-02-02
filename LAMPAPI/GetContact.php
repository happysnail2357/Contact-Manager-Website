<?php
    # Gets the input
    $inData = getRequestInfo();

    if($inData["userId"] == NULL || $inData["contactId"] == NULL)
    {
		returnWithError("Missing required field(s).");
		return;
	}

    # Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
        return;
    }

    # Retrieves a specific contact for the logged-in user
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=? AND ID=?");
    $stmt->bind_param("ii", $inData["userId"], $inData["contactId"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc())
        returnWithInfo($row["FirstName"], $row["LastName"], $row["Phone"], $row["Email"], $row["Address"], $row["Age"], $row["Birthday"], $row["Emoji"]);
    else
        returnWithError("No contact found");

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
	
	function returnWithInfo($firstName, $lastName, $phone, $email, $address, $age, $birthday, $emoji)
	{
		$retValue = '{"firstName":"' .$firstName. '","lastName":"' .$lastName. '", "phone":"' .$phone. '", "email":"' .$email. '", "address":"' .$address. '", "age":' .$age. ', "birthday":"' .$birthday. '", "emoji":"'.$emoji. '"}';
		sendResultInfoAsJson($retValue);
	}
?>
