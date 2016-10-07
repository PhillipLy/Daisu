var main = function() {
    'use strict';
    
    //login button pressed
    $('#login-button').on('click', function() {
        var username = $('#username').val(),
            password = $('#password').val(),
            loginData,
            $list = $("<ul>").addClass("list");

        var $data;
            console.log(username + " length: " + $.trim(username).length);
            console.log(password + " length: " + $.trim(password).length);

        //remove error message
        $('.ui.error.message .list').remove();

        $.ajax({
                url:'./php/login.php',
                method:'POST',
                data:{username:username, password:password},
                cache: false,
                beforeSend:function() {
                    $('#login-button').val('connecting...');
                },
                success:function(data) {
                    $data = data;
                    if(data) {
                        console.log($data);
                        $('body').load("home.php").hide().fadeIn(1000);
                        //$('.master-menu .right .signin').remove();
                        //$('.master-menu .right').load("home.php");
                    }
                    else {
                        $('#login-button').val("Login");
                        $list.append($("<li>").text("Wrong username or password"));
                        $list.hide();
                        $('.ui.error.message').append($list);
                        $list.fadeIn();
                    }

                }
            });
            /*
        //check username and password contain value
        if(($.trim(username).length > 0) && ($.trim(password) > 0)) {
            console.log("if statement");
            $.ajax({
                url:'login.php',
                method:'POST',
                data:{username:username, password:password},
                cache: false,
                beforeSend:function() {
                    $('#login-button').val('connecting...');
                },
                success:function(data) {
                    console.log(data);
                    if(data) {
                        $('body').load(index.php);
                        $('.master-menu .right .signin').remove();
                        $('.master-menu .right').load("home.php");
                    }
                    else {
                        $('#login-button').val("Login");
                        $list.append($("<li>").text("Wrong username or password"));
                        $list.hide();
                        $('.ui.error.message').append($list);
                        $list.fadeIn();
                    }

                }
            });
            console.log(data);
        } 
        else {
            console.log("else statement");
            $list.append($("<li>").text("Enter username and password"));
            $list.hide();
            $('.ui.error.message').append($list);
            $list.fadeIn();
            return false;
        }
        */
    });



};
$(document).ready(main);