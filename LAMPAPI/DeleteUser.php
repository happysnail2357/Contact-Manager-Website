<?php
    # Gets the input
    $inData = getRequestInfo();

    # Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        # Begin a transaction
        $conn->begin_transaction();

        try {
            # Delete all contacts associated with the user
            $stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=?");
            $stmt->bind_param("i", $inData["userId"]);
            $stmt->execute();
            $stmt->close();

            # Delete the user
            $stmt = $conn->prepare("DELETE FROM Users WHERE ID=?");
            $stmt->bind_param("i", $inData["userId"]);
            $stmt->execute();
            $stmt->close();

            # Commit the transaction
            $conn->commit();
            sendResultInfoAsJson("User and contacts deleted successfully.");
        } catch (Exception $e) {
            # Rollback the transaction on error
            $conn->rollback();
            returnWithError($e->getMessage());
        }

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
