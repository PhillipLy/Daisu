var main = function () {
    'use strict';

    //load user menu from menubar.html
    $('#master-menu').load('menubar.html');

    //check if user have already logged in
    var checkLogin = function () {
        $.get('php/check-login.php', function(data) {
            if(data) {
                $('#userMenu').append(data);
                //enable user-menu dropdown
                $('.ui.pointing.dropdown').dropdown({
                    on: 'click',
                    transition: 'fade down',
                    action: 'nothing'
                });
            }
            else {
                console.log("cannot load check-login.php");
            }
        });
    };

    //execute check user login
    checkLogin();

};

$(document).ready(main);