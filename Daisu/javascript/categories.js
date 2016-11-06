var main = function() {
	
	//activate picture dimmer
	$('.ui.segment .thirteen.column .image').dimmer({
		on: 'hover'
	});

	//activate left side menu
	//$('.ui.segment .three.column .vertical.menu .item').tab();
};

$(document).ready(main);