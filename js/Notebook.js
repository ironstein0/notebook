var Notebook = function() {
    this.init();
    this.draw();
};

Notebook.prototype.init = function() {
    
    // generate three column structure

    ////////////////////////////////////////////
    // only to enable bootstrap compatibility
    ////////////////////////////////////////////
    $('#content').toggleClass('container');
    $('.container').append('<div class="row"></div>')
    
    $('.row').append('<div class="col-md-3 left-column column"></div>');
    $('.row').append('<div class="col-md-7 middle-column column"></div>')
    $('.row').append('<div class="col-md-2 right-column column"></div>');
    $('.left-column').css('position', 'relative');

    $('body').append('<div id="drawing"></div>');

    // move all content to middle column
    var content = $('#content').children();
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
    this.positionElements();
    $(window).on('resize', this.positionElements);
    setTimeout(this.positionElements, 20);
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
            left: 20
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
    
    var content = $('.left-column').find('*');
    content.push.apply($('.right-column').find('*'));

    // remove all previous underlines
    $.each($('#drawing').children('svg'), function(index, value) {
        $(this).remove();
    });

    // underline notes corresponding to sidenotes
    for(var i=0; i<content.length; i++) {
        var referencedElement = $('#' + content.eq(i).data()['sidenote']);
        assert(referencedElement != undefined);
        Notebook.prototype.underline(referencedElement);
    }
};

Notebook.prototype.underline = function(jqueryObject) {
    // checkout solution at http://stackoverflow.com/questions/15960653/obtain-a-line-of-a-paragraph-in-html

    var spanify = function(jqueryObject) {
        var textArray = jqueryObject.text().split(' ');
        var newHtml = '';
        $.each(textArray, function(index, value) {
            newHtml += '<span>' + value + ' </span>';
        });
        // removing the last extra whitespace
        newHtml = newHtml.substr(0, newHtml.length - 8) + newHtml.substr(newHtml.length - 7, newHtml.length);
        
        jqueryObject.html(newHtml);
    };

    var originalHtml = jqueryObject.html();
    spanify(jqueryObject);

    var lineArray = [[]];
    var lastBox = new Box();
    lastBox.left = 0;
    lastBox.top = 0;
    lastBox.bottom = 0;
    lastBox.right = 0;
    $.each(jqueryObject.find('span'), function(index, value) {
        box = new Box($(this));
        if(box.right < lastBox.right) {
            // new line started
            lineArray.push([]);
        }
        lineArray[lineArray.length - 1].push(box);
        lastBox = box;
    });

    // draw actual svg path elements on the screen for all lines
    for(var i=0; i<lineArray.length; i++) {
        var firstBox = lineArray[i][0];
        var lastBox = lineArray[i][lineArray[i].length - 1];
        Notebook.prototype.drawLine(firstBox.left, firstBox.bottom, lastBox.right, lastBox.bottom);
    }

    // convert element to original non spanned version
    jqueryObject.html(originalHtml);
};

Notebook.prototype.drawLine = function(x1, y1, x2, y2) {
    var pathStrokeWidth = 6;
    
    // calculate with, height, top and left of svg element required
    if(x1 < x2) {
        var svgLeft = x1;
        var svgWidth = x2 - x1;
    } else {
        var svgLeft = x2;
        var svgWidth = x1 - x2;
    }

    if(y1 < y2) {
        var svgTop = y1;
        var svgHeight = y2 - y1;
    } else {
        var svgTop = y2;
        var svgHeight = y1 - y2;
    }

    // if height is less than pathStrokeWidth, then set it equal to pathStrokeWidth
    svgHeight = (svgHeight >= pathStrokeWidth) || pathStrokeWidth;

    // create svg
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
    svg.style.top =  svgTop;
    svg.style.left = svgLeft;

    // calculate x1, y1, x2, y2 relative to the svg element
    var x1_rel = x1 - svgLeft;
    var x2_rel = x2 - svgLeft;
    var y1_rel = y1 - svgTop;
    var y2_rel = y2 - svgTop;
    var pathPath = 'M ' + x1_rel + ' ' + y1_rel + ' L ' + x2_rel + ' ' + y2_rel;

    // create path
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'red');
    path.setAttribute('stroke-width', pathStrokeWidth + 'px');
    path.setAttribute('fill', 'transparent');
    path.setAttribute('d', pathPath);
    svg.appendChild(path);

    // append path to svg 
    svg.appendChild(path);

    // add svg to document
    document.getElementById('drawing').appendChild(svg);
};

Notebook.prototype.draw = function() {

};