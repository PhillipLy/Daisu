var main = function() {
    var vm = {
        items: ko.observableArray(),
        //detele later after items have review obj
        review: ko.observable('0'),
        searchSegment: ko.observable(false),
        searchResultNumber: ko.observable(0),
        searchInput: ko.observable(''),
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
        //reload page after click link
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

        var result = {
            method: 'thumbnail',
            data: hashes
        };

        //default search segment
        vm.searchSegment(false);

        if(hashes.indexOf('search=') >= 0) {
            //display search segment
            vm.searchSegment(true);

            hashes = hashes.split('&');

            // loop for multiple variables
            for(var i = 0; i < hashes.length; i++)
            {
                //split hashes into variable name and value
                hash = hashes[i].split('=');
                //push variable name into vars
                variables.push(hash[0]);
                //replace + with space
                hash[1] = hash[1].split('+').join(' ');
                //assign variable name with value
                variables[hash[0]] = hash[1];
            }

            //search result to search
            result = {
                method: 'search',
                data: variables
            };

            //display search input
            vm.searchInput(result.data.search);
        }

        console.log(result);

        return result;
    };

    //get query in url
    var urlQuery = getUrlVars();

    //check if 
    if(urlQuery.method === 'thumbnail') {
        if (urlQuery.data) {
            var path = urlQuery.data;  

            var element = ".item." + path.slice(0, path.indexOf('/'));
            //active the category tab
            $(element + ' .title').toggleClass('active');
            $(element + ' .content').toggleClass('active');

            //active the sub category tab
            $(element).find('a.item[data-tab="' + path +'"]').toggleClass('active');
        };
    }

    //send thumbnail request
    var thumbnailRequest = function() {
        var category = urlQuery.data;
        $.get({
            url: './php/thumbnail.php',
            data: {category: category},
            success: function(data) {
                if(data) {
                    
                    //display items
                    vm.items(data);
                    vm.review('0');

                    //enable function after load products
                    enableFunctions();
                }
                else {
                    console.log('cannot load data');
                }
            },
            dataType: 'json'
        });
    }

    //send search request
    var searchRequest = function() {
        var searchInput = urlQuery.data.search;
        
        $.get({
            url: './php/search.php',
            data: {search: searchInput},
            success: function(data) {
                if(data) {

                    //display number for result get from searching
                    vm.searchResultNumber(data.search_number);

                    //display items
                    vm.items(data.items);
                    vm.review('0');

                    //enable function after load products
                    enableFunctions();
                }
                else {
                    console.log('cannot load data');
                }
            },
            dataType: 'json'
        });
    }
    
    //send request to product.php for items
    var loadProductData = function() {
        if(urlQuery.method === 'thumbnail') {
            //all thumbnail request
            thumbnailRequest();
        } else {
            console.log('call search');
            //all thumbnail request
            searchRequest();
        }        
    };

    //display the first load
    loadProductData();    

    //active accordion
    $('.accordion.menu').accordion();
    
};

$(document).ready(main);