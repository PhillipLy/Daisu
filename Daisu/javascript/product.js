var main = function () {
	//return id of item
    var getUrlId = function () {
        var queryIndex = window.location.href.indexOf('?'),
            id = window.location.href.slice(queryIndex + 1);

        return id;
    };

    var quantity = 0,
    	itemId = getUrlId();
/*
    //send request to product.php for items
    var loadItemDetail = function() {        
        $.ajax({
            url:'./php/product.php',
            method:'POST',
            data:{id: itemId},
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success:function(data) {
                if(data) {
                	//display the item had add to cart
                }
                else {
                    console.log('cannot load data');
                }
            }
        });        
    };*/

    //dropdown for quantity
    $('.ui.dropdown').dropdown();

    //add to cart button clicked
    $('#addToCartButton').on('click', function() {
    	console.log("button clicked");

    });

    

};

$(document).ready(main);