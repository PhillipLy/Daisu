var main = function() {
    'use strict';
    
    //login error validation
    $('.ui.form').form({
        fields: {
            firstName: {
                identifier  : 'firstName',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your first name'
                    }
                ]
            },
            lastName: {
                identifier  : 'lastName',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your last name'
                    }
                ]
            },
            username: {
                identifier  : 'username',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your username'
                    }
                ]
            },
            email: {
                identifier  : 'email',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your email'
                    },
                    {
                        type   : 'email',
                        prompt : 'Please enter a valid e-mail'
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
            },
            passwordConfirm: {
                identifier  : 'passwordConfirm',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your confirm password'
                    },
                     {
                        type   : 'match[password]',
                        prompt : 'Your password is not match'
                    }
                ]
            },
            term: {
                identifier  : 'term',
                rules: [
                    {
                        type   : 'checked',
                        prompt : 'You must agree to the terms and conditions'
                    }
                ]
            }
        },
        onSuccess: function(event) {
            console.log("button pressed");
            var firstName = $('#firstName').val(),
                middleName = $('#middleName').val(),
                lastName = $('#lastName').val(),
                username = $('#username').val(),
                email = $('#email').val(),
                password = $('#password').val(),
                $list = $("<ul>").addClass("list");

            $.ajax({
                url:'./php/signup.php',
                method:'POST',
                data:{firstName:firstName, middleName:middleName, lastName:lastName, username:username, email:email, password:password},
                cache: false,
                success:function(data) {
                    if(data) {
                        $('.ui.success.message').slideDown(400);
                        $('.ui.success.message').delay(2000).fadeOut(1600);
                        $('#firstName').val("");
                        $('#middleName').val('');
                        $('#lastName').val('');
                        $('#username').val('');
                        $('#email').val('');
                        $('#password').val('');
                        $('#confirmPassword').val('');
                    } 
                    else {
                        $('.ui.form').toggleClass("success error");
                        $('.error .list').remove();
                        $list.append($("<li>").text("Can't create an account"));
                        $list.hide();
                        $('.ui.error.message').append($list);
                        $list.fadeIn();
                    }
                }
            });
            return false;
        },
        onFailure: function () {
            console.log("failure");
            return false;
        }
    });


};
$(document).ready(main);