var main = function() {

	//return query variables that in the url
    var getUrlVars = function () {
        var variables = [],
            hash,
            queryIndex = window.location.href.indexOf('#/'),
            hashes = window.location.href.slice(queryIndex + 1).split('/');

        console.log("hashes:");
        console.log(hashes);

        if (queryIndex != -1) {
            for(var i = 0; i< hashes.length; i++) {
                if(hashes[i] !== ''){
                    variables.push(hashes[i]);
                }                
            }
        }
        console.log("variables:");
        console.log(variables);
        return variables;
    };

    var tabSelection = function(targetTab) {
    	var element = '.accordion.menu .item[data-tab="' + targetTab +'"]';

    	//active tab selected
        $.tab('change tab', targetTab);

        //active accordion base on tab selected
        var element = '.accordion.menu .item[data-tab="' + targetTab +'"]';
        $(element + ' .title').toggleClass('active');
        $(element + ' .content').toggleClass('active');
    }
    

    //check active tab from tab pass by url
    var array = getUrlVars();
    if (array.length > 0) {
    	tabSelection(array[0]);
    };

    //check which tab click
    $('.thirteen.column .column .content a').on('click', function() {
    	//$('.thrteen')
    	var selectTab = $(this).attr('href').slice(2);
        
        tabSelection(selectTab);
    });
	
	//activate picture dimmer
	$('.ui.segment .thirteen.column .image').dimmer({
		on: 'hover'
	});

	//active accordion
    $('.accordion.menu').accordion();

	//activate left side menu
	//$('.ui.segment .three.column .vertical.menu .item').tab();
};

$(document).ready(main);