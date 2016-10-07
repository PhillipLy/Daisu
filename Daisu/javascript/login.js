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

        //check user enter username and password
        if(username != '' && password != '') {
            $.ajax({
                url:'./php/login.php',
                method:'POST',
                data:{username:username, password:password},
                cache: false,
                beforeSend:function() {
                    $('#login-button').val('connecting...');
                },
                success:function(data) {
                    if(data) {
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
        }
    });

    //login error validation
    $(function() {
        $('.ui.form').form({
            fields: {
                username: {
                    identifier  : 'username',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter your username'
                        }
                    ]
                },
                password: {
                    identifier  : 'password',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter your password'
                        },
                        {
                            type   : 'length[6]',
                            prompt : 'Your password must be at least 6 characters'
                        }
                    ]
                }
            }
        });
    });
    

};
$(document).ready(main);