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

    var urlQuery = getUrlQuery();

    // return a template of item
    // para id - item id
    // para url - image
    // para title - title
    // para price - price
    // para desc - small description of item
    var itemTemplate = function(id, url, title, price) {
        var item = '<div class="item">' +
                        '<a href="product?id=' + id + '" class="ui small image">' +
                            '<img src="' + url + '">' +
                        '</a>' +
                        '<div class="content">' +
                            '<a href="product?id=' + id + '" class="header">' + title + '</a>' +
                            '<div class="description">' +
                                '<div class="sub-description">' +
                                    '<h3>' +
                                        '<span class="price">$' + price + '</span>' +
                                    '</h3>' +
                                    '<div class="rating">' +
                                        '<div class="half-star-rating">' +
                                            '<select id="rating" name="rating" data-current-rating="3.2">' +
                                                '<option value=""></option>' +
                                                '<option value="1">1</option>' +
                                                '<option value="2">2</option>' +
                                                '<option value="3">3</option>' +
                                                '<option value="4">4</option>' +
                                                '<option value="5">5</option>' +
                                            '</select>' +
                                            '<p class="review">(2 review)</p>' +
                                    '</div></div></div>' +
                                '<div class="ui right floated sub-description">' +
                                    '<p></p>' +
                                '</div>' +
                            '</div></div></div>';
        return item;
    };

    var displayProduct = function(jsonArray) {
        var targetElement = $('#search-items');

        //remove exiting item
        targetElement.empty();

        //empty item list
        var itemList = $('<div class="ui divided items">');

        var template;

        //add individual item into item list
        $.each(jsonArray, function(index, obj) {
            //use the item template
            template = itemTemplate(obj.itemId, obj.url, obj.title, obj.price);

            //add item to item list
            itemList.append(template);
        });

        //add item list to the active tab
        targetElement.append(itemList);
    };

    var loadSearchData = function() {
        var searchInput = urlQuery.search;
        console.log(searchInput);
        console.log("start getting data");
        $.get({
            url: './php/search.php',
            data: {search: searchInput},
            success: function(data) {
                if(data) {
                	//display number for result get from searching
                	$('#result-number').html(data.search_number);
                	console.log(data.search_number);
                	console.log("data: " + data);

                    //display items
                    displayProduct(data.items);

                    console.log(data);
                }
                else {
                    console.log('cannot load data');
                }
            },
            dataType: 'json'
        });
        
    };

    loadSearchData();

    //display search input
	$('#search-input').html(urlQuery.search);

	//active left accordion
    $('.vertical.accordion.menu').accordion();
   
};

$(document).ready(main);