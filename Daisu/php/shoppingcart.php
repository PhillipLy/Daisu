<?php
  session_start();

    $loggedIn = false;

    //check if user loged in
    if(isset($_SESSION["username"])) {
        $loggedIn = True;
    }

    if($loggedIn) {
        $username = $_SESSION["username"];
        
        //datavase connection
        $connect = mysqli_connect("localhost", "root", "", "daisu_db");
        
        //--------------------------------------------------------------------
        //****GET USER ID FROM DATABASE USING USERNAME****
        //--------------------------------------------------------------------
        
        $sqlone = "SELECT * FROM `user` WHERE username = '" . $username . "'";
        
        $resultone = mysqli_query($connect, $sqlone);

        $num_row_one = mysqli_num_rows($resultone);

        if($num_row_one > 0) {
            $data = mysqli_fetch_array($resultone);
            $userid = $data["userid"];
        }
        else //check this {
            echo "Error: User not found.";
        }
        
        //--------------------------------------------------------------------
        //****CREATE SHOPPING CART ENTRY****
        //--------------------------------------------------------------------
    
        //check if quantity is specified
        if(isset($_POST["quantity"])) {
            $quantity = mysqli_real_escape_string($connect, $_POST["quantity"]);

            //database query request
            $sql = "INSERT INTO `user` (`userid3`, `itemid3`, `quantity`) VALUES (
                        '" . $userid . "',
                        '" . $itemid . "',
                        '" . $quantity . "')";
                        
            if(mysqli_query($connect, $sql)) {
                echo "Your account have successfully created";
            }
        }
    }
?>