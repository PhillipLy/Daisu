var main = function() {


    //return query variables in the url
    var getUrlVars = function () {
        var variables = [],
            hash,
            queryIndex = window.location.href.indexOf('?'),
            hashes = window.location.href.slice(queryIndex + 1).split('&');

        //convert query url into object
        for(var i = 0; i< hashes.length; i++) {
            hash = hashes[i].split('=');
            variables.push(hash[0]);
            variables[hash[0]] = hash[1];
        }

        return variables;
    }

    //enable left side tab
    $('#thumbnail .three.wide.column .menu .item').tab({
        context: $('#thumbnail .thirteen.wide.column'),
        history : true
    });

    //enable star rating
    $('#thumbnail .thirteen.column .item #rating').barrating({
        theme: 'fontawesome-stars-o',
        showSelectedRating: false,
        initialRating: 4.2,
        readonly: true
    });

    /*
    //card frame for product item
    var generateCard = function (url, title, description, star, review) {
        var card = '<div class="ui card" style="display: none;">'+
                        '<div class="blurring dimmable image">'+
                            '<div class="ui dimmer">' +
                                '<div class="content">' +
                                    '<div class="center">' +
                                        '<div class="ui inverted button">Get Detail</div>' +
                            '</div></div></div>' +
                            '<img src="' + url + '">'+
                        '</div>'+
                        '<div class="content">' +
                            '<a class="header">' + title + '</a>' +
                            '<div class="description">' + description + '</div>'+
                        '</div>'+
                        '<div class="extra aligned">'+
                            '<div class="right floated">' + review + ' Review</div>' +
                            '<div class="ui star rating" data-rating="' + star + '" data-max-rating="5">'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        return card;
    };

    //add 
    var addStackCards = function (data) {
        var $columnCard = $('<div class="doubling stackable four column ui four cards">');
        var i = 0;
        //
        var card = generateCard(data.url, data.title, data.description, data.star, data.review);

        for(;i<8;i++) {
            $columnCard.append(card);
        }
    };

    var displayCards = function() {
        var data = {"url":"http://semantic-ui.com/examples/assets/images/wireframe/image.png",
                    "title":"Custome",
                    "price": 1.00,
                    "description":"Products Gear Description",
                    "star":4,
                    "review":2};
        
        addStackCards(data);
    };

    displayCards();
    */
};

$(document).ready(main);