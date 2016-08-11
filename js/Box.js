var Box = function(jqueryObject) {
    if(jqueryObject != undefined) {
        var offset = jqueryObject.offset();
        var unknownOffset = -8;
        this.top = offset.top + unknownOffset;
        this.left = offset.left + unknownOffset;

        // source http://javascript.info/tutorial/coordinates
        // var boundingRectangle = jqueryObject.get(0).getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;
        
        // // calculate page scroll
        // var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        // var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // // the document (html or body) can be shifted from left upper corner in 
        // // internet explorer. get the shift
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // // add scrolls to window-relative coordinates and subtract shift to get
        // // the cordinates of the element in the whole document
        // this.top = boundingRectangle.top + scrollTop - clientTop;
        // this.left = boundingRectangle.left + scrollLeft - clientLeft;
        this.bottom = this.top + jqueryObject.outerHeight();
        this.right = this.left + jqueryObject.outerWidth();
        this.id = jqueryObject.data()['sidenote'];
    }
}

// copies all the attributes of 'box' to this instance of the Box
Box.prototype.copy = function(box) {
    this.top = box.top;
    this.left = box.left;
    this.bottom = box.bottom;
    this.right = box.right;
    this.id = box.id;
}

// returns true if the point represented by (x,y)
// lies inside this box isntance
Box.prototype.isInside = function(x, y) {
    if(((x > this.left) && (x < this.right)) && ((y > this.top) && (y < this.bottom))) {
        return true;
    } return false;
}

// returns an array consisting the downwards displacement 'displacementDown'
// or the upwards displacement 'displacementUp' required to make the 'box'
// not overlap this instance of Box
Box.prototype.avoidOverlap = function(box) {
    assert(box instanceof Box);
    if((box.top >= this.top && box.top < this.bottom) || ((box.bottom <= this.bottom) && (box.bottom > this.top))) {
        var displacementDown = this.bottom - box.top;
        var displacementUp = box.bottom - this.top;
        return [displacementDown, displacementUp]; 
    } else {
        return [0, 0];
    }
}

// for moving the box around, only use the moveTopTo or moveLeftTo 
// methods since manually changing one attribute of the box does not
// change other attributes. For example, changing the 'top'
// attribute of the box does not automatically change the 'bottom'
// of the box, which is the expected behaviour most of the times
Box.prototype.moveTopTo = function(top){
    var displacement = top - this.top;
    this.top = top;
    this.bottom += displacement;
}

Box.prototype.moveLeftTo = function(left) {
    var displacement = left - this.left;
    this.left = left;
    this.right += displacement;
}

Box.prototype.positionBox = function(positionedBoxArray) {
    
    // for(var i=0; i<positionedBoxArray.length; i++) {
    //     // console.log(this.toString());
    //     // console.log(positionedBoxArray[i].toString());
    //     var displacement = positionedBoxArray[i].avoidOverlap(this);
    //     // console.log(displacement);
    //     if(displacement[0] != 0) {
    //         // console.log('displacing ' + this.id + ' to the bottom of ' + positionedBoxArray[i].id);
    //         this.moveTopTo(positionedBoxArray[i].bottom);
    //     }
    // }
    if(positionedBoxArray.length != 0) {
        if(this.top < positionedBoxArray[positionedBoxArray.length - 1].bottom) {
            this.moveTopTo(positionedBoxArray[positionedBoxArray.length - 1].bottom);
        }
    }
}

Box.prototype.toString = function() {
    var returnString = 'top : ' + this.top + '; ';
    returnString += 'bottom : ' + this.bottom + '; ';
    returnString += 'left : ' + this.left + '; ';
    returnString += 'right : ' + this.right + '; ';
    return returnString;
}