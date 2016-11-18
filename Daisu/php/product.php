<?php
    session_start();

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db");
    
    //check if username and password have values
    if(isset($_GET["itemId"])) {
        $itemid = mysqli_real_escape_string($connect, $_POST["itemId"]);

        //database query request
        $sql = "SELECT * FROM item WHERE itemid = '" . $itemid . "'";
        $sqlone = "SELECT * FROM detail WHERE itemid = '" . $itemid . "'";
       
        $result = mysqli_query($connect, $sql);
        $resultone = mysqli_query($connect, $sqlone);

        $num_row = mysqli_num_rows($result);
        $num_row_one = mysqli_num_rows($resultone);
        
        $description = [];

        if($num_row > 0 and $num_row_one > 0) {
            $data = mysqli_fetch_array($result)
            $dataone = mysqli_fetch_array($resultone)
            
            $arr = ('itemId' => $data["itemid"], 'title' => $data["productname"], 
                 'brand' => $data["brand"], 'price' => $data["price"], 'color' => $data["color"], 
                 'url' => $data["picturelink"], 'detail' => $dataone["detail"]);
                
<<<<<<< HEAD
               array_push($description, json_encode($arr));
            }
            echo $description;
=======
            array_push(description, json_encode($arr));
            
            echo description;
>>>>>>> 41178fcb92a1999bba0732fb093c64da156deec5
        }
    }
?>