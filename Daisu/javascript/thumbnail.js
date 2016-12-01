var main = function() {
    var vm = {
        items: ko.observableArray(),
        //detele later after items have review obj
        review: ko.observable('0'),
        linkQuery: function(itemId) {
            var link = 'product?id=' + itemId;
            return link;
        }
    };

    ko.applyBindings(vm);

    var enableFunctions = function() {
        //display items when click
        $('a.item').on('click', function() {
            loadProductData();
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
    categoryTab = categoryTab.slice(0, categoryTab.indexOf('/'));
    if (categoryTab) {
        var element = ".item." + categoryTab;
        console.log(element);
        $(element + ' .title').toggleClass('active');
        $(element + ' .content').toggleClass('active');
    };
    
    //send request to product.php for items
    var loadProductData = function() {
        var urlQuery = getUrlVars();
        $.get({
            url: './php/thumbnail.php',
            data: {category: urlQuery},
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
    };

    //display the first load
    loadProductData();    

    //active accordion
    $('.accordion.menu').accordion();

    //enable left side tab
    $('#thumbnail .three.wide.column .menu .content .item').tab({
        context: $('#thumbnail .thirteen.wide.column'),
        history : true
    });
    
};

$(document).ready(main);