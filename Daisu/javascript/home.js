var main = function () {
    'use strict';
    
    $('.ui.pointing.dropdown').dropdown({
        on: 'click',
        transition: 'fade down',
		action: 'nothing'
    });

/*
    $('.ui.right.pointing.dropdown').on('click', function () {
        $('.ui.right.pointing.dropdown').addClass("active visible");
    });
*/
};