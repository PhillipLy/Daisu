<?php

    //datavase connection
    $connect = mysqli_connect("localhost", "root", "", "daisu_db")
    or die ("Could not connect to server ... \n" . mysqli_error());

    //check if user already have item
    function check($userId, $itemId) {
        global $connect;

        $sql = "SELECT * 
                FROM `shoppingcart` 
                WHERE userid3 = '" . $userId . "' AND itemid3 = '" . $itemId ."'";

        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);

        //item exit in user cart
        if($num_row > 0) {
            return true;
        } 
        //not found
        else {
            return false;
        }
    }

    //get the items list from user
    function get($userId) {
        global $connect;

        $sql = "SELECT * 
                FROM `shoppingcart` cart 
                LEFT JOIN `item` item 
                ON cart.itemid3=item.itemid 
                WHERE userid3 = '" . $userId . "'";

        $result = mysqli_query($connect, $sql);

        $num_row = mysqli_num_rows($result);

        $cartItems = array( 'userId' => $userId,
                            'numberOfItems' => $num_row, 
                            'items' => '');

        $items = [];

        if($num_row > 0) {
            //loop for each item in user cart 
            while($data = mysqli_fetch_array($result)) {

                $arr = array( 'itemId' => $data["itemid3"],
                            'title' => $data["productname"],
                            'brand' => $data["brand"],
                            'price' => $data["price"],
                            'color' => $data["color"],
                            'url' => $data["picturelink"],
                            'quantity' => $data["quantity"]);
                $arr = array_map('utf8_encode', $arr);

                array_push($items, $arr);
            }
        } 
        
        $cartItems['items'] = $items;

        //return search result
        echo json_encode($cartItems);
    }

    //delete one already exit item
    function delete($userId, $itemId) {
        global $connect;

        $sql = "DELETE FROM `shoppingcart` 
                WHERE userid3 = '" . $userId . "' AND itemid3 = '" . $itemId ."'";

        //execute sql query
        mysqli_query($connect, $sql);

        //check number of row has deleting
        $num = mysqli_affected_rows($connect);

        $resultMsg = array('result' => 'false');

        if($num) {
            $resultMsg['result'] = 'true';
        }

        //return delete result
        echo json_encode($resultMsg);
    }

    // add item to user cart
    function insert($userId, $itemId, $quantity) {
        global $connect;

        $sql = "INSERT INTO `shoppingcart`(userid3, itemid3, quantity) 
                VALUES ('" . $userId . "', '" . $itemId ."', '" . $quantity ."')";

        //execute sql query
        mysqli_query($connect, $sql);

        $result = false;

        if(mysqli_affected_rows($connect) > 0) {
            $result = true;
        }

        return $result;
    }

    //edit single item quantity
    function update($userId, $itemId, $quantity) {
        global $connect;
        
        $sql = "UPDATE `shoppingcart` 
                SET quantity='" . $quantity . "' WHERE userid3 = '" . $userId . "' AND itemid3 = '" . $itemId ."'";

        //execute sql query
        mysqli_query($connect, $sql);

        $result = false;

        //check number of row has affected
        if(mysqli_affected_rows($connect) > 0) {
            $result = true;
        }

        return $result;
    }

    if(isset($_POST["userId"])) {
        $userId = mysqli_real_escape_string($connect, $_POST["userId"]);
        $method = mysqli_real_escape_string($connect, $_POST["method"]);
        $items = $_POST["items"];
        //check switch method to use
        switch ($method) {
            case 'get':
                //get user shopping cart list
                get($userId);
                break;

            case 'delete':
                // delete user item in cart
                for ($i = 0; $i< count($items); $i++) {
                    $item = $items[$i];

                    delete($userId, $item['itemId']);
                }
                break;

            case 'insert':

                $result = [];
                //loop all the items array
                for ($i = 0; $i< count($items); $i++) {

                    $item = $items[$i];

                    $itemResult = array('itemId' => $item['itemId'], 
                                        'result' => 'fail');

                    $resultSuccess = false;

                    //check if user already have item
                    if(check($userId, $item['itemid'])) {
                        //edit exiting item quantity
                        $resultSuccess = update($userId, $item['itemId'], $item['quantity']);
                    } 

                    //user doesn't have item in cart
                    else {
                        //add item to user cart
                        $resultSuccess = insert($userId, $item['itemId'], $item['quantity']);
                    }

                    //return success result for every items
                    if($resultSuccess) {
                        $itemResult['result'] = 'success';
                    }

                    array_push($result, $itemResult);
                }

                //send back list of insert or update items
                echo json_encode($result);
                break;

            case 'update':
                //edit exiting item quantity
                $item = $items[0];

                $updateSucc = update($userId, $item['itemId'], $item['quantity']);

                $result = array('result' => 'fail');

                if($updateSucc) {
                    $result['result'] = 'success';
                }
                
                //send back list of insert or update items
                echo json_encode($result);

                break;
            
            default:
                break;
        }
        
    }
?>