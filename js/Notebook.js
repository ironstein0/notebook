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

    $(window).on('resize', this.positionElements);
    setTimeout(this.positionElements, 10);
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

    // underline notes corresponding to sidenotes
    var content = $('.left-column').find('*');
    content.push.apply($('.right-column').find('*'));

    // remove all previous underlines
    $.each($('.drawing').children('*'), function(index, value) {
        $(this).remove();
    });

    for(var i=0; i<content.length; i++) {
        var referencedElement = $('#' + content.eq(i).data()['sidenote']);
        assert(referencedElement != undefined);
        Notebook.prototype.underline(referencedElement);
    }
};

Notebook.prototype.underline = function(jqueryObject) {
    // checkout solution at http://stackoverflow.com/questions/15960653/obtain-a-line-of-a-paragraph-in-html
    // jqueryObject.css('background-color', 'blue');
    // $.each(jqueryObject.find('*'), function() {
    //     $(this).css('background-color', 'blue');
    // });

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

    var printHtml = function(jqueryObject) {
        console.log($('<div>').append(jqueryObject.clone()).html());
    };

    printHtml(jqueryObject);
    var originalHtml = jqueryObject.html();
    spanify(jqueryObject);
    printHtml(jqueryObject);

    var lineArray = [[]];
    var lastBox = new Box();
    lastBox.left = 0;
    lastBox.top = 0;
    lastBox.bottom = 0;
    lastBox.right = 0;
    $.each(jqueryObject.find('span'), function(index, value) {
        console.log(value);
        box = new Box($(this));
        if(box.right < lastBox.right) {
            // new line started
            lineArray.push([]);
        }
        lineArray[lineArray.length - 1].push(box);
        lastBox = box;
    });
    console.log('lineArray !');
    console.log(lineArray);

    for(var i=0; i<lineArray.length; i++) {
        console.log('---------------');
        var firstBox = lineArray[i][0];
        var lastBox = lineArray[i][lineArray[i].length - 1];
        console.log(firstBox);
        console.log(lastBox);
        console.log(lineArray[i]);
        console.log(lineArray[i].length);
        console.log('---------------');
        var svgWidth = lastBox.right - firstBox.left;
        // var svgWidth = 100;
        // var svgHeight = lineArray[i][0].bottom - lineArray[i][0].top;
        var svgHeight = '100';
        // var svgText = '<svg width="' + svgWidth + '" height="' + svgHeight + '"></svg>';
        // var svgText = '<svg></svg>'
        // console.log(svgText);
        // var pathText = '<path d="M ' + firstBox.left + ' ' + firstBox.bottom + ' L ' + lastBox.right + ' ' + lastBox.bottom + '" ';
        // pathText += 'fill="transparent" stroke="black" stroke-width="4"/>';
        var pathPath = 'M' + firstBox.left + ' ' + firstBox.bottom + ' L' + lastBox.right + ' ' + lastBox.bottom;
        // console.log(pathText);
        // var svg = $(svgText);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        path.setAttribute('stroke', 'red');
        path.setAttribute('stroke-width', '4px');
        path.setAttribute('fill', 'black');
        path.setAttribute('d', pathPath);
        svg.appendChild(path);
        // $(path).attr('d', pathPath);
        // console.log('path : ' + svg);
        // path = $(pathText);
        // $(path).css('stroke', 'red');
        // $(path).css('fill', 'transparent');
        // $(path).css('stroke-width', "4px");
        // $(path).css('visibility', 'visible');
        // $(svg).html(pathText);
        document.getElementById('drawing').appendChild(svg);
        $('#drawing').html($('#drawing').html());
        // $("body").html($("body").html());
        // printHtml($(svg));
        // $('#drawing').append(svg);
        // $('.drawing').append(svg);
        console.log('hmmm');
    }

    // convert element to original non spanned version
    jqueryObject.html(originalHtml);
};

Notebook.prototype.draw = function() {

};