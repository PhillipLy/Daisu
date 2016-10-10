<?php
    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    //check if username and password have values
    if(isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"])) {
        $firstName = mysqli_real_escape_string($connect, $_POST["firstName"]);
        $middleName = mysqli_real_escape_string($connect, $_POST["middleName"]);
        $lastName = mysqli_real_escape_string($connect, $_POST["lastName"]);
        $username = mysqli_real_escape_string($connect, $_POST["username"]);
        $email = mysqli_real_escape_string($connect, $_POST["email"]);
        $password = mysqli_real_escape_string($connect, $_POST["password"]);

        //database query request
        $sql = "INSERT INTO `user` (`userID`, `firstName`, `middleName`, `lastName`, `username`, `email`, `password`) VALUES (NULL,
                    '" . $firstName . "',
                    '" . $middleName . "',
                    '" . $lastName . "', 
                    '" . $username . "', 
                    '" . $email . "', 
                    '" . $password . "')";
                    
        if(mysqli_query($connect, $sql)) {
            echo "Your account have successfully created";
        }
    }
?>