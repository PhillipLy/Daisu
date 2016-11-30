var main = function() {
    var vm = {
        items: ko.observableArray(),
        linkQuery: function(itemId) {
            var link = 'product?id=' + itemId;
            return link;
        }
    };

    ko.applyBindings(vm);

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

    
    //active accordion
    $('.accordion.menu').accordion();

    //enable left side tab
    $('#thumbnail .three.wide.column .menu .content .item').tab({
        context: $('#thumbnail .thirteen.wide.column'),
        history : true
    });

    //enable star rating
    $('#thumbnail .thirteen.column .item #rating').barrating({
        theme: 'fontawesome-stars-o',
        showSelectedRating: false,
        initialRating: '',
        readonly: true
    });
    
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

    //display items when click
    $('a.item').on('click', function() {
        loadProductData();
    });
};

$(document).ready(main);