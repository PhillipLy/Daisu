var main = function() {

    var taxPercent = 8;

    //Knockout js view model
    var vm = {
        cartItems: ko.observableArray([]),
        firstName: ko.observable(''),
        lastName: ko.observable(''),
        address: ko.observable(''),
        city: ko.observable(''),
        zipCode: ko.observable(''),
        phone: ko.observable(''),
        shippingPrice: ko.observable(0),
        cartItemNumber: ko.observable(0),
        taxTotal: ko.observable(0),
        subTotal: ko.observable(0),
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
            vm.subTotal(subTotal.toFixed(2));

            //return the total price to display
            return '$' + subTotal.toFixed(2);
        }),
        computeTax: ko.pureComputed(function() {
            var tax = vm.subTotal() * taxPercent / 100;

            vm.taxTotal(tax.toFixed(2));
            return '$' + tax.toFixed(2);
        }),
        orderTotal: ko.pureComputed(function() {
            var orderTotal = vm.subTotal() + vm.taxTotal() + vm.shippingPrice();
            orderTotal = parseInt(orderTotal);
            console.log(parseInt(orderTotal));

            return '$' + orderTotal.toFixed(2);
        })
    }

    ko.applyBindings(vm);

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

                    enableFuntions();
                }
                else {
                    console.log('cannot load data');
                }
            }
        });
    }

    //enable all functions in shopping cart
    var enableFuntions = function() {
        $('.three.steps a.step.button').on('click', function() {
            console.log(this);
            console.log('step click');
        });
    };
};

$(document).ready(function() {
    //load jquery cookie before check login
    $.getScript("javascript/jquery.cookie.js", function(){
        main();
    });
});