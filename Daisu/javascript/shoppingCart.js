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

    //send request to product.php for items
    var loadCartData = function(userInfo) {
        
        $.ajax({
            url:'./php/shoppingCart.php',
            method:'POST',
            data:{userId: userInfo.userId},
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
    };

    //get username and userId
    $.get({
        url: './php/getUserLogin.php',
        success: function(data) {
            if(data) {
                //display items
                loadCartData(data);
            }
            else {
                console.log('cannot load data');
            }
        },
        dataType: 'json'
    });

    //dropdown for quantity
    $('.ui.dropdown').dropdown();
};

$(document).ready(main);