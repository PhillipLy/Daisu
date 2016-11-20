var main = function () {
    'use strict';

    //functions for menu after load
    // to prevent asynchronous
    var activeMenuFunctions = function() {
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

        //prevent form to reload page
        $('#search-form').submit(function(e) {
            e.preventDefault();
            var searchInput = $('#search-input').val();
            if(searchInput === '') {
                console.log('no input');
            } else {
                //convert search into url query
                var query = searchInput.split(' ').join('+');

                //go to search page with url query
                window.location = 'search?search=' + query;
            }
        });


    };

    //check if user have already logged in
    var checkLogin = function () {
        $.get('php/check-login.php', function(data) {
            if(data) {
                $('#userMenu').append(data);

                //active menu functions
                activeMenuFunctions();                
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
    

    

    /*

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
    */
};

$(document).ready(main);