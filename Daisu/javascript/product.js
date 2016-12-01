var main = function () {


    //return id of item
    var getUrlId = function () {
        var queryIndex = window.location.href.indexOf('?'),
            id = window.location.href.slice(queryIndex + 1);

            //remove "id="
            id = id.slice(id.indexOf('=')+1);

        return id;
    };

    var quantity = 0,
        itemId = getUrlId();

    var displayProduct = function(data) {
        $('#title').html(data.title);
        $('#image').attr("src",data.url.slice(0,-3) + "500");
        $('#price').html('$' + data.price);
        $('#color').html(data.color);

        //empty description
        $('#description').empty();

        //display description detail
        $.each(data.description, function(index, value) {
            var detail = $('<li>' + value + '</li>');
            $('#description').append(detail);
        });
    };

    //send request to product.php for item detail
    var loadItemDetail = function() {       

        $.get({
            url: './php/product.php',
            data: {itemId: itemId},
            success: function(data) {
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
    loadItemDetail();

    //dropdown for quantity
    $('.ui.dropdown').dropdown();


    //add to cart button clicked
    $('#addToCartButton').on('click', function() {

        //get userId from cookie
        var userId = $.cookie('userId');
        var quantity = $('#quantity-dropdown .text').text();

        var items = [];
        //push item array
        items.push({itemId: itemId, quantity: quantity});

        console.log(items);
        
        $.ajax({
            url:'./php/shoppingcart.php',
            method:'POST',
            data:{userId: userId, method: 'insert', items: items},
            dataType: 'json',
            cache: false,
            success:function(data) {
                if(data) {
                    //display the item had add to cart
                    console.log(data);
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
        
    });
};

$(document).ready(function() {
    //load jquery cookie before check login
    $.getScript("javascript/jquery.cookie.js", function(){
        main();
    });
});