<?php
    # Gets the input
    $inData = getRequestInfo();

    # Connect to the database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        # Retrieves a specific contact for the logged-in user
        $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=? AND ID=?");
        $stmt->bind_param("ii", $inData["userId"], $inData["contactId"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            returnWithInfo($row);
        } else {
            returnWithError("No contact found");
        }

        $stmt->close();
        $conn->close();
    }

    # The helper functions (getRequestInfo, returnWithInfo, returnWithError, sendResultInfoAsJson) are the same as in GetContacts.php
?>
