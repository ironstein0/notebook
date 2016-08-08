var notebook = function() {
    // generating three column structure
    $('.content').toggleClass('container');
    $('.container').append('<div class="row"></div>')
    $('.row').append('<div class="col-md-3 left-column column"></div>');
    $('.row').append('<div class="col-md-7 middle-column column"></div>')
    $('.row').append('<div class="col-md-2 right-column column"></div>');
    $('.left-colunm').append('<h1>left-column</h1>');
    
    // move all content to middle column
    var content = $('.content').children();
    $.each(content, function(index, value) {
        var childJqueryObject = content.eq(index);
        if(! childJqueryObject.hasClass('row')) {
            var children = childJqueryObject.find();
            var htmlToAppend = childJqueryObject.clone().wrap('<div>').parent().html();
            $('.middle-column').append(htmlToAppend);
            childJqueryObject.remove();
        }
    });

    // move sidenotes to left column
    var content = $('.middle-column').find('*');
    $.each(content, function(index, value) {
        var childJqueryObject = content.eq(index);
        var hasAttribute = function(jqueryObject, attributeName) {
            var attr = $(jqueryObject).attr(attributeName);
            if((typeof attr !== typeof undefined) && (attr != false)) {
                return true;
            } return false;
        }

        if(hasAttribute(childJqueryObject, 'data-sidenote')) {
            console.log('hurray');
            var htmlToAppend = childJqueryObject.clone().wrap('<div>').parent().html();
            $('.left-column').append(htmlToAppend);
            childJqueryObject.remove();
        }
    });

    // make all columns the same height
    this.resizeColumns();
    $(window).on('resize', this.resizeColumns);
};

notebook.prototype.resizeColumns = function() {
    var leftColumn = $('.left-column');
    var rightColumn = $('.right-column');
    if(leftColumn != undefined) {
        $('.left-column').height($('.middle-column').height());
    }
    if(rightColumn != undefined) {
        $('.right-column').height($('.middle-column').height());
    }

};