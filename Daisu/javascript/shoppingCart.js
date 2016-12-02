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
                    //display items
                    vm.cartItems(data.items);
                    console.log(data);

                    vm.saveItemNumber(data.numberOfSaveItems);
                    vm.saveItems(data.saveItems);

                    cartItemFunctions();
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
    };

    //load cart items after get in shopping cart page
    loadCartData();


    //requests to server
    var shoppingCartRequest = function(data) {
        var items = [];
        items.push({itemId: data.itemId, quantity: data.quantity});

        var method = data.method;

        //user ajax to send POST request
        $.ajax({
            url:'./php/shoppingCart.php',
            method:'POST',
            data:{userId: userId, method: method, items: items},
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
        cartItems: ko.observableArray(),
        saveItems: ko.observableArray([]),
        ItemQty: ko.observable(10),
        subTotal: ko.observable(0),
        cartItemNumber: ko.observable(0),
        saveItemNumber: ko.observable(0),
        deleteCartItem: function() {
            var data = {itemId: this['itemId'], quantity: '', method: 'delete'};
            
            // send request to delete the item
            shoppingCartRequest(data);
        },
        saveForLater: function() {
            var data = {itemId: this['itemId'], quantity: '', method: 'saveForLater'};
            
            // send request to delete the item
            shoppingCartRequest(data);
        },
        deleteSaveLater: function() {
            var data = {itemId: this['itemId'], quantity: '', method: 'deleteSaveLater'};
            
            // send request to delete the item
            shoppingCartRequest(data);
        },
        moveToCart: function() {
            var data = {itemId: this['itemId'], quantity: '1', method: 'moveToCart'};
            
            // send request to delete the item
            shoppingCartRequest(data);
        },
        changeQty: function() {
            var targetItem = this;

             $('.ui.dropdown').dropdown({
                onChange: function(value, text, $selectedItem) {
                    var data = {itemId: targetItem['itemId'], quantity: text, method: 'update'};
                    
                    //send request to change selected item quantity
                    shoppingCartRequest(data);
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

            //update total number of item to viewMobel
            vm.cartItemNumber(totalItems);
            //update cart item number in menu bar
            $('#itemcount').html(totalItems);

            //change number of item in cookie
            $.cookie('cartCount', totalItems, { path: '/' });

            //return the total price to display
            return '$' + subTotal.toFixed(2);
        }),
        linkQuery: function(itemId) {
            var link = 'product?id=' + itemId;
            return link;
        }
    };

    ko.applyBindings(vm);
};

$(document).ready(function() {
    //load jquery cookie before check login
    $.getScript("javascript/jquery.cookie.js", function(){
        main();
    });
});