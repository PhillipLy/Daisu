
<!DOCTYPE html>
<?php
    session_start();
    if(isset($_SESSION["username"])) {
        header("location:home.php");
    } 
?>

<html>
    <head>
        <title>Daisu</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/reset.css">
        <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">    
        <link rel="stylesheet" type="text/css" href="css/style.css">  
    </head>

    <body>
    <!-- Following menu-->
    <div class="ui large top fixed menu transition visible" id="menuBar">
        <div class="ui master-menu container">
            <a href="index.php" class="active item">Home</a>

            <div class="ui simple dropdown item">
                Products<i class="dropdown icon"></i>
                <div class="menu">
                    <a href="#" class="item">Gear</a>
                    <a href="#" class="item">Clothing</a>
                    <a href="#" class="item">Footwear</a>
                    <a href="#" class="item">Packs</a>
                </div>
            </div>
         
            <div class="ui simple dropdown item">
                Trails<i class="dropdown icon"></i>
                <div class="menu">
                    <a href="#" class="item">Mountaineering</a>
                    <a href="#" class="item">Climbing</a>
                    <a href="#" class="item">Hiking</a>
                    <a href="#" class="item">Camping</a>
                </div>
            </div>
            <a href="#" class="item">About Us</a>
            <a href="#" class="item">Support</a>
            <div class="right menu">
                <a href="#" title="My Cart" class="item">
                    <span>My Cart</span>
                    <div class="cartimage">
                        <i class="large cart icon"></i>
                        <div class="ui red label itemcount">1</div>
                    </div>          
                </a>
                <a href="signup.html" class="item signin">
                    <div class="ui primary button">Sign Up</div>
                </a>
                <a href="login.html" class="item signin">
                    <div class="ui button">Login</div>
                </a>
            </div>
        </div>
    </div>

    <!-- login and create form-->
    <div class="ui disabled page dimmer">
        <div class="content">
            <div class="ui middle aligned center aligned grid transition hidden" id="login-form">
                <div class="column">
                    <h2 class="ui steal inverted image header">
                        <img src="#" class="image" alt="logo image">
                        <div class="ui inverted content">Login or Create an Account</div>
                    </h2>
                    <form class="ui large form" method="post">
                        <div class="ui stacked segment">
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" name="username" id="username" placeholder="Username">
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input type="password" name="password" id="password" placeholder="Password">
                                </div>
                            </div>
                            <div class="ui fluid x-large teal submit button" id="login-button">Login</div>
                        </div>

                        <!-- Error message-->
                        <div class="ui error message"></div>
                    </form>
                    <div class="ui message">
                        <a href="#">Forget Your Password?</a>
                        <div class="ui section divider"></div>
                        <label>New to us?</label>
                        <a href="signup.html">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Page Contents-->
    <div class="pusher dimmed">
        <div class="ui inverted vertical masthead center aligned segment">
            <img src="image/logo_op_720x450.jpg" alt="">
            <div class="ui text container">
                <h1 class="ui inverted header">Company Logo</h1>
                <h2>Sell all kind of mountain gear</h2>
            </div>    
        </div>

        <div class="ui three column doubling stackable grid container">
            <div class="column">
                <a href="#">
                    <img src="https://lh3.googleusercontent.com/-0dVkgqyPbEQ/VQnlT9U4HhI/AAAAAAAAIWE/XKyf38PHUB4/w728-h486-no/Tonquin-Valleyx.jpg" alt="">
                </a>       
            </div>
            <div class="column">
                <a href="#">
                    
                    <img src="https://lh6.googleusercontent.com/--uI_0050Z3M/VQnogtbFThI/AAAAAAAAIXM/57sEoJ_LxSE/w728-h483-no/8235991458_f19ac6d841_bx.jpg" alt="">
                </a>
            </div>
            <div class="column">
                <a href="#">
                    <img src="https://lh5.googleusercontent.com/-8adaEFfecL4/VQnl889stuI/AAAAAAAAIWc/vwdB5gMTNvw/w728-h398-no/6840018617_11c406c20e_ox.jpg" alt="">
                </a>
            </div>
            <div class="column">
                <a href="#">
                    <img src="https://lh6.googleusercontent.com/-MJTbQ1IN3jc/VQnrCJLNz5I/AAAAAAAAIX8/l8Upb5j0Hf0/w728-h485-no/12639281375_e336d48d05_ox.jpg" alt="">
                </a>
            </div>
            <div class="column">
                <a href="#">
                    <img src="https://lh5.googleusercontent.com/--YWLoP8DzYQ/VQkWS7aI6hI/AAAAAAAAIR8/k2W_Dl9B-sg/w728-h486-no/15287168445_673eff9c6c_ox.jpg" alt="">
                </a>
            </div>
            <div class="column">
                <a href="#">
                    <img src="https://lh4.googleusercontent.com/-VG1jSR0JmdQ/VQnsGTh4VhI/AAAAAAAAIYQ/01P3B4C8eZY/w728-h487-no/5588055078_9179a6be5b_ox.jpg" alt="">
                </a>     
            </div>
        </div>   
    </div>

    <!-- footer -->
    <footer>
        <div class="ui inverted vertical footer segment">
            <div class="ui container">
                <div class="ui stackable inverted divided equal height stackable grid">
                    <div class="three wide column">
                        <h4 class="ui inverted hedaer">Products</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Gear</a>
                            <a href="#" class="item">Clothing</a>
                            <a href="#" class="item">Footwear</a>
                            <a href="#" class="item">Packs</a>
                        </div>
                    </div>
                    <div class="three wide column">
                        <h4 class="ui inverted hedaer">Hiking Trail</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Mountaineering</a>
                            <a href="#" class="item">Climbing</a>
                            <a href="#" class="item">Hiking</a>
                            <a href="#" class="item">Camping</a>
                        </div>
                    </div>
                    <div class="three wide column">
                        <h4 class="ui inverted hedaer">About</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">About Us</a>
                            <a href="#" class="item">Contact Us</a>
                            <a href="#" class="item">FAQ</a>
                        </div>
                    </div>
                    <div class="seven wide column">
                        <h2>Logo</h2>
                        <h4>Explore more journey with Daisu hiking gear</h4>
                    </div>
                </div>
            </div>
        </div>    
    </footer>

    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="semantic/dist/semantic.min.js"></script> 
    <script src="javascript/login.js"></script>

    </body>
</html>