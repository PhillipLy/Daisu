var main = function() {

    //get userId from cookie
    var userId = $.cookie('userId');

    //load user item and save later items
    var loadCartData = function() {

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

                    //check user have item in cart
                    if(data.numberOfItems > 0) {
                        
                        //display items
                        vm.cartItems(data.items);                           

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
    };

    //load cart items after get in shopping cart page
    loadCartData();

    //update item
    var updateItem = function(itemId, quantity) {
        var items = [];
        //push item array
        items.push({itemId: itemId, quantity: quantity});

        //user ajax to send POST request
        $.ajax({
            url:'./php/shoppingCart.php',
            method:'POST',
            data:{userId: userId, method: 'update', items: items},
            dataType: 'json',
            cache: false,
            success:function(data) {
                if(data) {
                    console.log(data);
                    loadCartData();
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
    };

    //detele item
    var deleteItem = function(itemId) {
        var items = [];
        items.push({itemId: itemId});

        //user ajax to send POST request
        $.ajax({
            url:'./php/shoppingCart.php',
            method:'POST',
            data:{userId: userId, method: 'delete', items: items},
            dataType: 'json',
            cache: false,
            success:function(data) {
                if(data) {
                    console.log(data);
                    loadCartData();
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
    };

    var cartItemFunctions = function() {
        //dropdown for quantity
        $('.ui.dropdown').dropdown();
    };

    var vm = {
        changeQty: ko.observable(),
        cartItems: ko.observableArray(),
        ItemQty: ko.observable(10),
        subTotal: ko.observable(0),
        cartItemNumber: ko.observable(0),
        removeItem: function() {
            // send request to delete the item
            deleteItem(this['itemId']);

            //remove the item want to delete
            vm.cartItems.remove(this);
        },
        saveLater: function() {
            // send request to save the item

            //remove the item want to saved
            vm.cartItems.remove(this);
        },
        changeQty: function() {
            var targetItem = this;
            //var index = jQuery.inArray(targetItem, vm.cartItems());

             $('.ui.dropdown').dropdown({
                onChange: function(value, text, $selectedItem) {
                    //send request to change selected item quantity
                    updateItem(targetItem['itemId'], text);
                }
            });            
        },
        computeTotal: ko.pureComputed(function() {
            var items = vm.cartItems();
            var subTotal = 0,
                totalItems = 0;

            $.each(items, function(index, item) {
                subTotal += parseFloat(item.price) * parseInt(item.quantity);
                totalItems += parseInt(item.quantity);
            });

            vm.cartItemNumber(totalItems);
            $('#itemcount').html(totalItems);

            //change number of item in cookie
            $.cookie('cartCount', totalItems, { path: '/' });

            return '$' + subTotal;
        })
    };

    ko.applyBindings(vm);
};

$(document).ready(function() {
    //load jquery cookie before check login
    $.getScript("javascript/jquery.cookie.js", function(){
        main();
    });
});