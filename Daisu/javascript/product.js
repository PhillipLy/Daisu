var main = function () {
	//return id of item
    var getUrlId = function () {
        var queryIndex = window.location.href.indexOf('?'),
            id = window.location.href.slice(queryIndex + 1);

        return id;
    };

    var quantity = 0,
    	itemId = getUrlId();

    var displayProduct = function(data) {
        $('#title').html(data.title);
        $('#image').attr("src",data.url);
        $('#price').html(data.price);

        //empty description
        $('#description').empty();

        //display description detail
        $.each(data.description, function(index, value) {
            var detail = $('<li>' + value + '</li>');
            $('#description').append(detail);
        });
    };

    //send request to product.php for items
    var loadItemDetail = function() {
        var urlQuery = getUrlVars();
        $.get({
            url: './php/detail.php',
            data: {itemId: itemId},
            success: function() {
                if(data) {
                    //display items
                    displayProduct(data);
                }
                else {
                    console.log('cannot load data');
                }
            },
            dataType: 'json'
        });

                
    };

    //dropdown for quantity
    $('.ui.dropdown').dropdown();

    //add to cart button clicked
    $('#addToCartButton').on('click', function() {
    	console.log("button clicked");
        $.ajax({
            url:'./php/addToCart.php',
            method:'POST',
            data:{itemId: itemId},
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success:function(data) {
                if(data) {
                    //display the item had add to cart
                    console.log("item added to shopping cart");
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
    });

    

};

$(document).ready(main);