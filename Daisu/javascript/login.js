var main = function() {
    'use strict';
    
    //login button pressed
    $('#login-button').on('click', function() {
        var username = $('#username').val(),
            password = $('#password').val(),
            loginData,
            $list = $("<ul>").addClass("list");

        //remove error message
        $('.ui.error.message .list').remove();

        //check username and password contain value
        if($.trim(username).length > 0 && $.trim(password) > 0) {
            $.ajax({
                url:'login.php',
                method:'POST',
                data:{username:username, password:password},
                cache: false,
                beforeSend:function() {
                    $('#login-button').val('connecting...');
                },
                success:function(data) {
                    if(data) {
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
        } 
        else {
            return false;
        }
    });



};
$(document).ready(main);