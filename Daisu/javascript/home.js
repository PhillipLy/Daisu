var main = function () {
    'use strict';

    var checkLogin = function () {
        $.get('php/check-login.php', function(data) {
            if(data) {
                $('.right.menu').append(data);
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

    checkLogin();
};

$(document).ready(main);