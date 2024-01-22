<?php
    # Gets the input
    $inData = getRequestInfo();

    # Query parameter
    $id = $inData["id"];

    # Attempts to connect to the database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
    else
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=?");
        $stmt->bind_param("i", $id);

        $stmt->execute();
        $stmt->store_result();

        if($stmt->affected_rows > 0)
            returnWithInfo("The contact was deleted from the database.");
        else
            returnWithError("The contact was not able to be deleted from the database.");

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