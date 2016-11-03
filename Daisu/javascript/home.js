var main = function () {
    'use strict';
    
    //enable user-menu dropdown
    $('.ui.pointing.dropdown').dropdown({
        on: 'click',
        transition: 'fade down',
		action: 'nothing'
    });

    //check if user already logged in
    $.ajax({
    	url:'./php/check-login.php',
        method:'POST',
        data:{username:username, password:password},
        cache: false,
        success:function(data) {
            if(data) {
                $('.right.menu').append(data);
            }
            else {
                console.log("cannot load check-login.php");
            }
        }
    });
/*
    $('.ui.right.pointing.dropdown').on('click', function () {
        $('.ui.right.pointing.dropdown').addClass("active visible");
    });
*/
};