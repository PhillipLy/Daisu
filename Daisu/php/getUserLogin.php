<?php
	session_start();

	$user = array('username' => '', 'userId' => '');

    //check if user loged in
    if(isset($_SESSION["username"])) {
        $user['username'] = $_SESSION["username"];
        $user['userId'] = $_SESSION["userId"];
    }

    echo json_encode($user);
?>