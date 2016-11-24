var main = function() {
     
    // return a template of item
    // para id - item id
    // para url - image
    // para title - title
    // para price - price
    // para desc - small description of item
    var itemTemplate = function(id, url, title, price) {
        var item = '<div class="item">' +
                        '<div class="ui small image">' +
                            '<img src="' + url + '">' +
                        '</div>' +
                        '<div class="content">' +
                            '<div class="ui grid">' +
                                '<div class="ten wide column">' +
                                    '<div class="header">' + title + '</div>' +
                                    '<div class="ui button" data-id="' + id + '">Delete</div>' +
                                '</div>' +
                                '<div class="three wide column">' +
                                    '<h3>' +
                                        '<span class="price">$' + price + '</span>' +
                                    '</h3>' +
                                '</div>' +
                                '<div class="three wide column">' +
                                    'Quantity' +
                    '</div></div></div></div>';
        return item;
    };

    var displayProduct = function(jsonArray) {
        var targetElement = $('#shoppingCartList');

        //remove exiting item
        targetElement.empty();        

        //empty item list
        var itemList = $('<div class="ui divided items">');

        var template;

        //add individual item into item list
        $.each(jsonArray, function(index, obj) {
            //use the item template
            template = itemTemplate(obj.id, obj.url, obj.title, obj.price, obj.description);

            //add item to item list
            itemList.append(template);
        });

        //add item list to the active tab
        targetElement.append(itemList);
    };

    //send post request to server to retreive shopping cart and save later items list
    var loadCartData = function() {
        //load jquery cookie before check login
        $.getScript("javascript/jquery.cookie.js", function(){
            //get userId from cookie
            var userId = $.cookie('userId');

            //user ajax to send POST request
            $.ajax({
                url:'./php/shoppingCart.php',
                method:'POST',
                data:{userId: userId},
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success:function(data) {
                    if(data) {
                        if(data === "empty") {
                            var targetElement = $('#shoppingCartList');

                            //remove exiting item
                            targetElement.empty();

                            //display the cart is empty
                            targetElement.append('<h2 class="ui header">Your Shopping Cart is empty.</h2>');
                        } else {
                            //display items
                            displayItems(data);
                        }
                    }
                    else {
                        console.log('cannot load data');
                    }
                }
            });
        });
    };
    
    //dropdown for quantity
    $('.ui.dropdown').dropdown();
};

$(document).ready(main);