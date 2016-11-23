var main = function() {    
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
    
    // return a template of item
    // para id - item id
    // para url - image
    // para title - title
    // para price - price
    // para desc - small description of item
    var itemTemplate = function(id, url, title, price) {
        var item = '<div class="item">' +
                        '<a href="product?id=' + id + '" class="ui small image">' +
                            '<img src="' + url + '">' +
                        '</a>' +
                        '<div class="content">' +
                            '<a href="product?id=' + id + '" class="header">' + title + '</a>' +
                            '<div class="description">' +
                                '<div class="sub-description">' +
                                    '<h3>' +
                                        '<span class="price">$' + price + '</span>' +
                                    '</h3>' +
                                    '<div class="rating">' +
                                        '<div class="half-star-rating">' +
                                            '<select id="rating" name="rating" data-current-rating="3.2">' +
                                                '<option value=""></option>' +
                                                '<option value="1">1</option>' +
                                                '<option value="2">2</option>' +
                                                '<option value="3">3</option>' +
                                                '<option value="4">4</option>' +
                                                '<option value="5">5</option>' +
                                            '</select>' +
                                            '<p class="review">(2 review)</p>' +
                                    '</div></div></div>' +
                                '<div class="ui right floated sub-description">' +
                                    '<p></p>' +
                                '</div>' +
                            '</div></div></div>';
        return item;
    };

    var displayProduct = function(jsonArray) {
        var urlQuery = getUrlVars();
        var targetElement = $('.ui.tab.segment[data-tab="' + urlQuery + '"');

        //remove exiting item
        targetElement.empty();

        //check if no data for the selected tab
        if(jsonArray.length <= 0) {
            var text = '<h3 class="ui header">There is no data avaliable for ' + urlQuery.slice(urlQuery.indexOf('/')+1) + '</h3>';
            targetElement.append(text);
            return;
        }

        //empty item list
        var itemList = $('<div class="ui divided items">');

        var template;

        //add individual item into item list
        $.each(jsonArray, function(index, obj) {
            //use the item template
            template = itemTemplate(obj.itemId, obj.url, obj.title, obj.price);

            //add item to item list
            itemList.append(template);
        });

        //add item list to the active tab
        targetElement.append(itemList);
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
                    displayProduct(data);
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