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

        $allVcards = "";
        while ($row = $result->fetch_assoc()) {
            $allVcards .= createVCardString($row);
        }

        $stmt->close();
        $conn->close();

        # Set headers for file download
        header('Content-Type: text/vcard');
        header('Content-Disposition: attachment; filename="all_contacts_' . $inData["userId"] . '.vcf"');
        header('Content-Length: ' . strlen($allVcards));

        # Output the VCF contents
        echo $allVcards;
        exit;
    }

    # Function to create a VCF string for a contact
    function createVCardString($contact) {
        $vcard = "BEGIN:VCARD\r\n";
        $vcard .= "VERSION:3.0\r\n";
        $vcard .= "N:" . $contact['LastName'] . ";" . $contact['FirstName'] . "\r\n";
        $vcard .= "FN:" . $contact['FirstName'] . " " . $contact['LastName'] . "\r\n";
        $vcard .= "TEL;TYPE=HOME,VOICE:" . $contact['Phone'] . "\r\n";
        $vcard .= "EMAIL:" . $contact['Email'] . "\r\n";
        $vcard .= "ADR;TYPE=HOME:" . $contact['Address'] . "\r\n";
        $vcard .= "END:VCARD\r\n";
        return $vcard;
    }

    # Gets the data from the request
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
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
