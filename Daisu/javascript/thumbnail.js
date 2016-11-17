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
    var itemTemplate = function(id, url, title, price, desc) {
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
                                    '<p>' + desc + '</p>' +
                                '</div>' +
                            '</div></div></div>';
        return item;
    };

    var displayProduct = function(jsonArray) {
        var urlQuery = getUrlVars();
        var targetElement = $('.ui.tab.segment[data-tab="' + urlQuery + '"');

        //remove exiting item
        targetElement.empty();

        //empty item list
        var itemList = $('<div class="ui items">');

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
//this is for testing only
    var jsonObj = [
        {
            id: 1,
            url: 'http://semantic-ui.com/images/wireframe/image.png',
            title: 'Title',
            price: '100.00',
            description: 'small description'
        },
        {
            id: 12,
            url: 'http://semantic-ui.com/images/wireframe/image.png',
            title: 'Title',
            price: '100.00',
            description: 'small description'
        },
        {
            id: 123,
            url: 'http://semantic-ui.com/images/wireframe/image.png',
            title: 'Title',
            price: '100.00',
            description: 'small description'
        },
        {
            id: 1234,
            url: 'http://semantic-ui.com/images/wireframe/image.png',
            title: 'Title',
            price: '100.00',
            description: 'small description'
        }
    ];

    //send request to product.php for items
    var loadProductData = function() {
        var urlQuery = getUrlVars();
        $.ajax({
            url:'./php/product.php',
            method:'POST',
            data:{type: urlQuery},
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success:function(data) {
                if(data) {
                    //display items on first load
                    displayProduct(data);
                }
                else {
                    console.log('cannot load data');
                }
            }
        });        
    };
    

    //display items when click
    $('a.item').on('click', function() {
        loadProductData();
    });
};

$(document).ready(main);