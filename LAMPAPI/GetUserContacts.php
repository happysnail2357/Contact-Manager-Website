<?php
    # Gets the input
    $inData = getRequestInfo();

    # Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        # Retrieves all contacts for the logged-in user
        $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=?");
        $stmt->bind_param("i", $inData["userId"]);
        $stmt->execute();
        $result = $stmt->get_result();

        $contacts = [];
        while ($row = $result->fetch_assoc()) {
            array_push($contacts, $row);
        }

        $stmt->close();
        $conn->close();

        # Returns the contacts as JSON
        returnWithInfo($contacts);
    }

    # Gets the data from the request
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    # Send the user's contacts if successful
    function returnWithInfo($contacts) {
        $retValue = json_encode($contacts);
        sendResultInfoAsJson($retValue);
    }

    # Return error if something goes wrong
    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    # Send a JSON response back to the client
    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }
?>
