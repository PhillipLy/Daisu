var main = function() {
    'use strict';
    
    //login error validation
    $('#login-form').form({
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
        }, 
        onSuccess: function(event){
            var username = $('#username').val(),
                password = $('#password').val(),
                $list = $("<ul>").addClass("list");

            $.ajax({
                url:'./php/login.php',
                method:'POST',
                data:{username:username, password:password},
                cache: false,
                success:function(data) {
                    if(data) {
                        window.location.href="index.html";
                    }
                    else {
                        $('.ui.form').toggleClass("success error");
                        $('.error .list').remove();
                        $list.append($("<li>").text("Wrong username or password"));
                        $list.hide();
                        $('.ui.error.message').append($list);
                        $list.fadeIn();
                    }
                }
            });
            return false;
        },
        onFailure: function() {
            console.log('failure');
            $('.error .list').hide().fadeIn();
            return false;
        }
    });

    //login button pressed
    $('#loginButton').on('click',function() {
        $('#login-form').form('validate form');
    });

};
$(document).ready(main);