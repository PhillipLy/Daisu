<?php
    session_start();

    if(!isset($_SESSION["username"])) {
        header("location:index.php");
    }

    echo '<h1 align="center">Welcome ' . $_SESSION["username"] . ' to Daisu.</h1>';
    echo '<p align="center"><a href="logout.php">Logout</a></p>';
    /*
    echo '<div class="ui simple dropdown item">
                Hello, '. $_SESSION["username"] . '<i class="dropdown icon"></i>
                <div class="menu">
                    <a href="#" class="item">Your Account</a>
                    <a href="#" class="item">Your Order</a>
                    <a href="#" class="item">Your List</a>
                    <a href="logout.php" class="item">Logout</a>
                </div>
            </div>';
            */

?>