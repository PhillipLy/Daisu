var main = function () {
	
	//read GET URL variables and return them as json object
	var getUrlQuery = function () {
        var vars = [],
        	hash,
        	queryIndex = window.location.href.indexOf('?'),
            hashes = window.location.href.slice(queryIndex + 1).split('&');

        // loop for multiple variables
        for(var i = 0; i < hashes.length; i++)
	    {
	    	//split hashes into variable name and value
	        hash = hashes[i].split('=');
	        //push variable name into vars
	        vars.push(hash[0]);
	        //replace + with space
	        hash[1] = hash[1].split('+').join(' ');
	        //assign variable name with value
	        vars[hash[0]] = hash[1];
	    }

        return vars;
    };

    var searchInput = getUrlQuery();

    //display search input
	$('#search-input').html(searchInput.search);

   
};

$(document).ready(main);