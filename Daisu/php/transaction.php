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
        else { 
            echo "Error: User not found.";
        }
        
        //--------------------------------------------------------------------
        //****VERIFY ITEMS EXIST IN SHOPPING CART****
        //--------------------------------------------------------------------
        
        $sqltwo = "SELECT * FROM `shoppingcart` WHERE userid3 = '" . $userid . "'";
        
        $resulttwo = mysqli_query($connect, $sqltwo);

        $num_row_two = mysqli_num_rows($resulttwo);
        
        if($num_row_two > 0)
        {
        
          //--------------------------------------------------------------------
          //IF ITEMS EXIST IN THE SHOPPING CART, CREATE A TRANSACTION
          //--------------------------------------------------------------------
        
          //check if we have the necessary data
          if(isset($_POST["shippingtype"]) && isset($_POST["quantity"]) && isset($_POST["streetaddress"]) && isset($_POST["city"]) 
          && isset($_POST["state"]) && isset($_POST["zipcode"]) && isset($_POST["cardholdername"]) && isset($_POST["cardtype"]) 
          && isset($_POST["cardnumber"]) && isset($_POST["cardexpiration"])) 
          {
               $shippingtype = mysqli_real_escape_string($connect, $_POST["shippingtype"]);
               $quantity = mysqli_real_escape_string($connect, $_POST["quantity"]);
               $streetaddress = mysqli_real_escape_string($connect, $_POST["streetaddress"]);
               $city = mysqli_real_escape_string($connect, $_POST["city"]);
               $state = mysqli_real_escape_string($connect, $_POST["state"]);
               $zipcode = mysqli_real_escape_string($connect, $_POST["zipcode"]);
               $cardholdername = mysqli_real_escape_string($connect, $_POST["cardholdername"]);
               $cardtype = mysqli_real_escape_string($connect, $_POST["cardtype"]);
               $cardnumber = mysqli_real_escape_string($connect, $_POST["cardnumber"]);
               $cardexpiration = mysqli_real_escape_string($connect, $_POST["cardexpiration"]);
        
               //get timestamp for database entry
               $time = time();
        
               //database query request
               $sqlthree = "INSERT INTO `transactionhistory` (`datetime`, `shippingtype`, `streetaddress`, `city`, `state`, `zipcode`,
               `cardholdername`, `cardtype`, `cardnumber`, `cardexpiration`, `userid1`) VALUES ( 
                         '" . $time . "',
                         '" . $shippingtype . "',
                         '" . $streetaddress . "', 
                         '" . $city . "', 
                         '" . $state . "',
                         '" . $zipcode . "', 
                         '" . $cardholdername . "', 
                         '" . $cardtype . "', 
                         '" . $cardnumber . "',
                         '" . $cardexpiration . "',
                         '" . $userid . "')";
                         
               if(!mysqli_query($connect, $sqlthree)) 
               {
                  echo "Error: creating transaction.";
               }
          }
  
          //-------------------------------------------------------------------
          //****ADD ITEMS INTO ITEM TRANSACTION RECORD AND DELETE FROM CART****
          //-------------------------------------------------------------------
   
          while($data = mysqli_fetch_array($resulttwo))
          {
            $itemid = $data["itemid3"];
            $quantity = $data["quantity"];
            
            //insert item into item transaction table
            $sqlfour = "INSERT INTO `transactionhas` (`userid2`, `itemid3`, `quantity`) VALUES ( 
                    '" . $userid . "',
                    '" . $itemid . "',
                    '" . $quantity . "')";
                    
            if(!mysqli_query($connect, $sqlfour)) 
            {
              echo "Error: processing items in transaction.";
            }
            
            //delete item from shopping cart table
            $sqlfive = "DELETE FROM `shoppingcart` WHERE userid3 = '" . $userid . "' AND itemid3 = '" . $itemid . "'";
            
            if(!mysqli_query($connect, $sqlfive)) 
            {
              echo "Error: deleteing items in shopping cart.";
            }  
          }
               
        }
        else //check this
        {
            echo "Error: No items in shopping cart.";
        }
    }
    else 
    {
        echo '<a href="signup.html" class="item signin">
                <div class="ui primary button">Sign Up</div>
            </a>
            <a href="login.html" class="item signin">
                <div class="ui button">Login</div>
            </a>';
    }
?>