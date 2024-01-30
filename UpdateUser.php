<?php
    # Gets the input
    $inData = getRequestInfo();

    # Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError("Database connection failed: " . $conn->connect_error);
    } else {
        # Prepare the SQL statement for updating the user's password
        $stmt = $conn->prepare("UPDATE Users SET Password=? WHERE ID=?");
        $stmt->bind_param("si", $inData["password"], $inData["userId"]);

        # Execute the statement and check if it was successful
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                sendResultInfoAsJson("Password updated successfully.");
            } else {
                returnWithError("No update made. Check if the user ID is correct.");
            }
        } else {
            returnWithError("Error updating password: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    }

    # Gets the data from the request
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    # Send a JSON response back to the client
    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    # Return error if something goes wrong
    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
?>
