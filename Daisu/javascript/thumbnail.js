var main = function() {
    var vm = {
        items: ko.observableArray(),
        //detele later after items have review obj
        review: ko.observable('0'),
        linkQuery: function(itemId) {
            var link = 'product?id=' + itemId;
            return link;
        }, 
        addToCartButton: function(item, event) {
            console.log(this);
            //get quantity element to extract quantity value
            var quantityElement = $(event.target).prev(),
                quantity = $(quantityElement).find('.text').text();

            //get userId from cookie and itemId from item
            var userId = $.cookie('userId'),
                itemId = item.itemId;

            var items = [];
            //push item array
            items.push({itemId: itemId, quantity: quantity});

            //send request to add item to shopping cart
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
        }
    };

    ko.applyBindings(vm);

    var enableFunctions = function() {
        //display items when click
        $('a.item').on('click', function() {
            location.reload();
        });

        //dropdown for quantity
        $('.ui.dropdown').dropdown();    

        //enable star rating
        $('#thumbnail .thirteen.column .item #rating').barrating({
            theme: 'fontawesome-stars-o',
            showSelectedRating: false,
            initialRating: 1,
            readonly: true
        });
    };

    //return query variables that in the url
    var getUrlVars = function () {
        var variables = [],
            hash,
            queryIndex = window.location.href.indexOf('#/'),
            hashes = window.location.href.slice(queryIndex + 2);

        return hashes;
    };

    //active accordion base on tab that passed in url 
    var categoryTab = getUrlVars();
    if (categoryTab) {        

        var element = ".item." + categoryTab.slice(0, categoryTab.indexOf('/'));
        //active the category tab
        $(element + ' .title').toggleClass('active');
        $(element + ' .content').toggleClass('active');

        //active the sub category tab
        $(element).find('a.item[data-tab="' + categoryTab +'"]').toggleClass('active');
    };
    
    //send request to product.php for items
    var loadProductData = function() {
        var urlQuery = categoryTab;
        $.get({
            url: './php/thumbnail.php',
            data: {category: urlQuery},
            success: function(data) {
                if(data) {
                    
                    //display items
                    vm.items(data);
                    vm.review('0');
                    console.log(data);

                    //enable function after load products
                    enableFunctions();
                }
                else {
                    console.log('cannot load data');
                }
            },
            dataType: 'json'
        });
    };

    //display the first load
    loadProductData();    

    //active accordion
    $('.accordion.menu').accordion();
    
};

$(document).ready(main);