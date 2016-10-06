<?php
    session_start();

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    //check if username and password have values
    if(isset($_POST["username"]) && isset($_POST["password"])) {
        $username = mysqli_real_escape_string($connect, $_POST["username"]);
        $password = password_hash(mysqli_real_escape_string($connect, $_POST["password"]),PASSWORD_DEFAULT);

        //database query request
        $sql = mysqli_query($connect, "SELECT * FROM `users` WHERE username = `" . $username . "` AND `password` = `" $password . "'");

        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);

        if($num_row > 0) {
            $data = mysqli_fetch_array($result);
            $_SESSION["username"] = $data["username"];
            echo $data["username"];
        }
    }
?>