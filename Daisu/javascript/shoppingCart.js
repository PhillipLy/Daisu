var main = function() {

    var cartItemFunctions = function() {
        //dropdown for quantity
        $('.ui.dropdown').dropdown();


    };
     
    // return a template of item
    // para id - item id
    // para url - image
    // para title - title
    // para price - price
    // para quantity - quantity
    var itemTemplate = function(id, url, title, price, quantity) {
        var item = '<div class="item">' +
                        '<div class="ui small image">' +
                            '<img src="' + url + '">' +
                        '</div>' +
                        '<div class="content">' +
                            '<div class="ui grid">' +
                                '<div class="ten wide column">' +
                                    '<h3 class="ui header">' + title + '</h3>' +
                                    '<button class="ui inverted red button" data-id="' + id + '">Delete</button>' +
                                    '<button class="ui inverted blue button" data-id="' + id + '">Move to Cart</button>' +
                                '</div>' +
                                '<div class="three wide column">' +
                                    '<h3>' +
                                        '<span class="price">$' + price + '</span>' +
                                    '</h3>' +
                                '</div>' +
                                '<div class="three wide column">Quantity' +
                                    '<div class="ui fluid selection dropdown">' +
                                        '<i class="dropdown icon"></i>' +
                                        '<div class="text">' + quantity + '</div>' +
                                        '<div class="menu">' +
                                            '<div class="item" data-value="1">1</div>' +
                                            '<div class="item" data-value="2">2</div>' +
                                            '<div class="item" data-value="3">3</div>' +
                                            '<div class="item" data-value="4">4</div>' +
                                            '<div class="item" data-value="5">5</div>' +
                    '</div></div></div></div></div></div>';
        return item;
    };

    var displayCartItems = function(jsonArray) {
        var targetElement = $('#shoppingCartList');

        var itemList = $('<div class="ui divided items">');

        var template;
        var subTotal = 0,
            totalItems = 0;

        //add individual item into item list
        $.each(jsonArray, function(index, obj) {
            //add total price
            subTotal += parseFloat(obj.price) * parseInt(obj.quantity);
            totalItems += parseInt(obj.quantity);

            //use the item template
            template = itemTemplate(obj.id, obj.url, obj.title, obj.price, obj.quantity);

            //add item to item list
            itemList.append(template);
        });

        //display item number
        if(totalItems === 1) {
            $('#subtotal-items').html('1 item');
        } else {
            $('#subtotal-items').html(totalItems + ' items');
        }

        //change number of item in cookie
        $.cookie('cartCount', totalItems, { path: '/' });

        //display total price
        $('#subtotal-price').html(subTotal);

        //add item list to the active tab
        targetElement.append(itemList);
    };

    //load user item and save later items
    var loadCartData = function() {
        //load jquery cookie before check login
        $.getScript("javascript/jquery.cookie.js", function(){
            //get userId from cookie
            var userId = $.cookie('userId');

            //user ajax to send POST request
            $.ajax({
                url:'./php/shoppingCart.php',
                method:'POST',
                data:{userId: userId, method: 'get', items: ''},
                dataType: 'json',
                cache: false,
                success:function(data) {
                    if(data) {
                        var targetElement = $('#shoppingCartList');

                        //remove exiting item
                        targetElement.empty();

                        //check user have item in cart
                        if(data.numberOfItems > 0) {
                            
                            //display items
                            displayCartItems(data.items);

                            cartItemFunctions();
                        } else {
                            //display the cart is empty
                            targetElement.append('<h2 class="ui header">Your Shopping Cart is empty.</h2>');
                        }
                    }
                    else {
                        console.log('cannot load data');
                    }
                }
            });
        });
    };

    loadCartData();
    
    
};

$(document).ready(main);