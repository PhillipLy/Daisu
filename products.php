<?php
    session_start();

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    //check if username and password have values
    if(isset($_GET["category"])) {
        $category = mysqli_real_escape_string($connect, $_GET["category"]);

        //database query request
        $sql = "SELECT * FROM `item` WHERE category = '" . $category . "'";
       
        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);

        if($num_row > 0) {
            while($data = mysqli_fetch_array($result)) {
              echo $data["itemid"];
              echo $data["productname"];
              echo $data["brand"];
              echo $data["price"];
              echo $data["color"];
              echo $data["picturelink"];
            }
        }
    }
?>