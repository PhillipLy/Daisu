<?php
    session_start();

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    //check if username and password have values
    if(isset($_POST["searchstr"])) {
        $searchstr = mysqli_real_escape_string($connect, $_POST["searchstr"]);

        //database query request
        $sql = "SELECT * FROM `item` WHERE productname LIKE '%" . $searchstr . "%'";
       
        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);
        
        $item = [];

        if($num_row > 0) {
            while($data = mysqli_fetch_array($result)) {
              $arr = ( 'itemId' => $data["itemid"], 'productname' => $data["productname"], 'brand' => $data["brand"],
              'price' => $data["price"], 'color' => $data["color"], 'picturelink' => $data["picturelink"]);
              
              array_push(item, json_encode($arr));
            }
            echo $item;
        }
    }
?>