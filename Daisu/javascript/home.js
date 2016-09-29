var main = function() {
    'use strict';
    
    //display login form
    var $formSlideDown = function () {
        $('#login-form').transition('slide down');
    };

    // active or disable dimmer
    var $dimpage = function() {
        $('.ui.page.dimmer').toggleClass('disabled active');
    };

    //click login-button
    $('#login-button').on('click', function() {
        $dimpage();
        $formSlideDown();
    });

    //chick login form
    $('#login-form').click(function(event) {
        //check if click outside the form
        if($(event.target).is('#login-form')) {
            $formSlideDown();
            setTimeout(function() {
                $dimpage();
            }, 200);
        } 

    });
};
$(document).ready(main);