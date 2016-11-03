<?php 
	session_start();

    $loggedIn = false;

    //check if user loged in
    if(isset($_SESSION["username"])) {
        $loggedIn = True;
    }

    if($loggedIn) {
        $username = $_SESSION["username"];
        $username[0] = strtoupper($username[0]);
        echo '<div class="ui pointing dropdown link item user-menu" id="user-menu">
                <img class="ui circular image" src="image/icon-user.png">
                <div class="menu">
                    <div class="item">
                        <div class="ui grid">
                            <div class="six wide column">
                                <img class="ui circular image" src="image/icon-user.png">
                            </div>
                            <div class="ten middle aligned wide column">
                                <h2 class="ui header"> '. $username . '</h2>
                                <a href="#" class="myAccount">
                                    <div class="ui blue button">My Account</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="item">
                        <a href="php/logout.php" class="logout">
                            <div class="ui large right floated button">Logout</div>
                        </a>
                    </div>
                </div>
            </div>';
    } else {
        echo '<a href="signup.html" class="item signin">
                <div class="ui primary button">Sign Up</div>
            </a>
            <a href="login.html" class="item signin">
                <div class="ui button">Login</div>
            </a>';
    }
?>