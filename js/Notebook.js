var Notebook = function() {
    this.init();
    this.positionElements();
    this.draw();
};

Notebook.prototype.init = function() {
    
    // generate three column structure

    ////////////////////////////////////////////
    // only to enable bootstrap compatibility
    ////////////////////////////////////////////
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

    $(window).on('resize', this.positionElements);
    setTimeout(this.positionElements, 1);
}

Notebook.prototype.resizeColumns = function() {
    var leftColumn = $('.left-column');
    var rightColumn = $('.right-column');
    if(leftColumn != undefined) {
        $('.left-column').height($('.middle-column').height());
    }
    if(rightColumn != undefined) {
        $('.right-column').height($('.middle-column').height());
    }

};

var positionedElementsArray = [];
Notebook.prototype.positionElement = function(jqueryObject) {
    var referencePointer = jqueryObject.data()['sidenote'];
    var referencedElement = $('#' + referencePointer);
    if(referencedElement != undefined) {
        jqueryObject.css('position', 'absolute');
        // initialize top same as that of the referenced element
        jqueryObject.offset({
            top: referencedElement.offset().top,
            left: 0
        });

        // create new box instance corresponding this element
        var objectBox = new Box(jqueryObject);

        // position the box
        objectBox.positionBox(positionedElementsArray);
        positionedElementsArray.push(objectBox);

        // change the position of this element to match that of 
        // the objectBox
        jqueryObject.offset({
            top: objectBox.top,
            left: objectBox.left
        });
        jqueryObject.css('width', '100%');
        jqueryObject.css('padding-left', '2px');
    }
};

Notebook.prototype.positionElements = function() {
    
    Notebook.prototype.resizeColumns();

    // position sidenotes
    positionedElementsArray = [];
    var content = $('.left-column').find('*');
    $.each(content, function(index, value) {
        Notebook.prototype.positionElement(content.eq(index));
    });
    
};

Notebook.prototype.draw = function() {

};