<?php
    session_start();

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    
    //check if username and password have values
    if(isset($_GET["itemId"])) {
        $itemid = mysqli_real_escape_string($connect, $_POST["itemId"]);

        //database query request
        $sql = "SELECT * FROM detail WHERE itemid = '" . $itemid . "'";
       
        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);
        
        $description = [];

        if($num_row > 0) {
            while($data = mysqli_fetch_array($result)) {
               $arr = ('detail' => $data["detail"]);
                
               array_push($description, json_encode($arr));
            }
            echo $description;
        }
    }
?>