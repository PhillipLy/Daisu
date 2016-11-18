var main = function () {
    'use strict';

    //check if user have already logged in
    var checkLogin = function () {
        $.get('php/check-login.php', function(data) {
            if(data) {
                $('#userMenu').append(data);

                //enable user-menu dropdown
                $('.ui.pointing.dropdown').dropdown({
                    on: 'hover',
                    transition: 'fade down',
                    action: 'nothing'
                });

                //enable popup on menubar
                $('.menu-popup').popup({
                    hoverable: true,
                    position: 'bottom left',
                    delay: {
                        show: 200,
                        hide: 400
                    }
                });
            }
            else {
                console.log("cannot load check-login.php");
            }
        });
    };

    //load user menu from menubar.html
    $('#master-menu').load('menubar.html', function( response, status, xhr ) {
        if ( status == "error" ) {
            var msg = "Sorry but there was an error: ";
            $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        } else {
            //execute check user login
            checkLogin();
        }
    });

    $('.ui.form').form({});

    $('#search-form').form({
        fields: {
            search: {
                identifier  : 'search',
                rules: [
                    {
                        type   : 'empty'
                    }
                ]
            }
        },
        onSuccess: function() {
            $('#searchButton').on('click', function() {
                console.log('test');
            });
            return false;
        },
        onFailure: function() {
            console.log('failure');
            return false;
        }
    });
};

$(document).ready(main);