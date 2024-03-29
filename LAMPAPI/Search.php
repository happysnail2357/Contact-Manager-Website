<?php
    # Gets the input
    $inData = getRequestInfo();

    if($inData["userId"] == NULL || $inData["query"] == NULL)
    {
		returnWithError("Missing required field(s).");
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

    # Checks to see if there is any contact with the
    $query = '%' .$inData["query"]. '%';
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE concat(FirstName, ' ', LastName) LIKE ? AND UserID=?");
    $stmt->bind_param("si", $query, $inData["userId"]);

    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows == 0)
        returnWithError("Could not find any contacts.");
    else
    {
        $contacts = [];
        while ($row = $result->fetch_assoc())
            array_push($contacts, $row);

        returnWithInfo($contacts);
    }

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
	
	function returnWithInfo($arr)
	{
		$retValue = json_encode($arr); //'{"contacts":"' .json_encode($arr). '","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>