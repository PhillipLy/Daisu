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

    

};

$(document).ready(main);