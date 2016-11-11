var main = function() {
	$('.ui.sticky').sticky({
		content: '.ui.divided.items',
		offset: 120
	});
};

$(document).ready(main);