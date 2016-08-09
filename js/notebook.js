var notebook = function() {
    this.init();
    this.positionElements();
    this.draw();
};

notebook.prototype.init = function() {
    
    // generate three column structure
    $('.content').toggleClass('container');
    $('.container').append('<div class="row"></div>')
    $('.row').append('<div class="col-md-3 left-column column"></div>');
    $('.row').append('<div class="col-md-7 middle-column column"></div>')
    $('.row').append('<div class="col-md-2 right-column column"></div>');
    $('.left-column').css('position', 'relative');

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

    this.positionElements();
    $(window).on('resize', this.positionElements);
}

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

notebook.prototype.positionElement = function(jqueryObject) {
    var pointer = jqueryObject.data()['sidenote'];
    var referencedElement = $('#' + pointer);
    var top = referencedElement.offset().top;
    console.log(top);
    jqueryObject.offset(referencedElement.offset());
    jqueryObject.css('position', 'absolute');
    // jqueryObject.css('top', top);
    jqueryObject.css('left', 10);
};

notebook.prototype.positionElements = function() {
    
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
            var htmlToAppend = childJqueryObject.clone().wrap('<div>').parent().html();
            $('.left-column').append(htmlToAppend);
            childJqueryObject.remove();
        }
    });

    // position sidenotes
    var content = $('.left-column').find('*');
    $.each(content, function(index, value) {
        notebook.prototype.positionElement(content.eq(index));
    });
    this.resizeColumns();
};

notebook.prototype.draw = function() {

};