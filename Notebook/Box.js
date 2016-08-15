var unknownOffset = -9;

var Box = function(jqueryObject) {
    if(jqueryObject instanceof $) {
        
        ///////////////////////////////////////////////////////
        // HOW Jquery's OFFSET METHOD WORKS
        // source http://javascript.info/tutorial/coordinates
        ///////////////////////////////////////////////////////

        // var boundingRectangle = jqueryObject.get(0).getBoundingClientRect();

        // var body = document.body;
        // var docElem = document.documentElement;
        
        // // calculate page scroll
        // var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        // var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // // the document (html or body) can be shifted from left upper corner in 
        // // internet explorer. get the shift
        // var clientTop = docElem.clientTop || body.clientTop || 0;
        // var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // // add scrolls to window-relative coordinates and subtract shift to get
        // // the cordinates of the element in the whole document
        // this.top = boundingRectangle.top + scrollTop - clientTop;
        // this.left = boundingRectangle.left + scrollLeft - clientLeft;
        
        var offset = jqueryObject.offset();
        this._top = offset.top + unknownOffset;
        this._left = offset.left + unknownOffset;
        this._bottom = this._top + jqueryObject.outerHeight();
        this._right = this._left + jqueryObject.outerWidth();
        this._id = jqueryObject.data()['sidenote'];
    } else if(jqueryObject === undefined) {
        this._top = 0;
        this._left = 0;
        this._bottom = 0;
        this._right = 0;
        this._id = undefined;
    } else {
        throw new TypeError('CreationError');
    }

    Object.defineProperty(this, 'top', {
        get: function() {
            return this._top;
        },
        set: function(top) {
            if(typeof top != 'number') {
                throw TypeError('ValueError');
            } else if(top < 0) {
                throw TypeError('ValueError');
            } this._top = Math.round(top);
        }
    });

    Object.defineProperty(this, 'left', {
        get: function() {
            return this._left;
        },
        set: function(left) {
            if(typeof left != 'number') {
                throw TypeError('ValueError');
            } else if(left < 0) {
                throw TypeError('ValueError');
            } this._left = Math.round(left);
        }
    });

    Object.defineProperty(this, 'bottom', {
        get: function() {
            return this._bottom;
        },
        set: function(bottom) {
            if(typeof bottom != 'number') {
                throw TypeError('ValueError');
            } else if(bottom < 0) {
                throw TypeError('ValueError');
            } this._bottom = Math.round(bottom);
        }
    });

    Object.defineProperty(this, 'right', {
        get: function() {
            return this._right;
        },
        set: function(right) {
            if(typeof right != 'number') {
                throw TypeError('ValueError');
            } else if(right < 0) {
                throw TypeError('ValueError');
            } this._right = Math.round(right);
        }
    });

    Object.defineProperty(this, 'id', {
        get: function() {
            return this._id;
        },
        // can not change the value of id once Box is created
        set: function(id) {
            throw ReferenceError('AccessError');
        }
    })

}

// copies all the attributes of 'box' to this instance of the Box
Box.prototype.copy = function(box) {
    this.top = box.top;
    this.left = box.left;
    this.bottom = box.bottom;
    this.right = box.right;
    this._id = box.id;
}

// for moving the box around, only use the moveTopTo or moveLeftTo 
// methods since manually changing one attribute of the box does not
// change other attributes. For example, changing the 'top'
// attribute of the box does not automatically change the 'bottom'
// of the box, which is the expected behaviour most of the times

// moves box top to "top", and moves bottom correspondingly
Box.prototype.moveTopTo = function(top){
    var displacement = top - this.top;
    this.top = top;
    this.bottom += displacement;
}

// moves box left to "left", and moves right correspondingly
Box.prototype.moveLeftTo = function(left) {
    var displacement = left - this.left;
    this.left = left;
    this.right += displacement;
}

// returns an array consisting the downwards displacement 'displacementDown'
// or the upwards displacement 'displacementUp' required to make the 'box'
// not overlap this instance of Box
Box.prototype.avoidOverlap = function(box) {
    assert(box instanceof Box);
    if(box.top < this.bottom) {
        return [this.bottom - box.top, 0];
    } return [0, 0];
}

Box.prototype.positionBox = function(leftColumnPositionedBoxArray, rightColumnPositionedBoxArray, referencedElement) {
    // TODO
    // change algorithm such that it checks both left and right column positions
    // before deciding where to position the box

    // TODO : bugfix
    // once the position of a sidenote is assigned to the right column 
    // the element is never positioned to left column again
    var leftColumnBias = 100;
    var referencedElementBox = new Box(referencedElement);
    this.moveTopTo(referencedElementBox.top);

    var displacementFromParentNodeWhenInLeftColumn = [0, 0];
    var displacementFromParentNodeWhenInRightColumn = [0, 0];
    if(leftColumnPositionedBoxArray.length !== 0) {
        displacementFromParentNodeWhenInLeftColumn = leftColumnPositionedBoxArray[leftColumnPositionedBoxArray.length - 1].avoidOverlap(this);
    }
    if(rightColumnPositionedBoxArray.length !== 0) {
        displacementFromParentNodeWhenInRightColumn = rightColumnPositionedBoxArray[rightColumnPositionedBoxArray.length - 1].avoidOverlap(this);
    }

    displacementFromParentNodeWhenInLeftColumn = displacementFromParentNodeWhenInLeftColumn[0];
    displacementFromParentNodeWhenInRightColumn = displacementFromParentNodeWhenInRightColumn[0];

    if(displacementFromParentNodeWhenInLeftColumn - leftColumnBias <= displacementFromParentNodeWhenInRightColumn) {
        // position in left column
        this.moveTopTo(this.top + displacementFromParentNodeWhenInLeftColumn);
        return 'left';
    } else {
        // position in right column
        this.moveTopTo(this.top + displacementFromParentNodeWhenInRightColumn);
        this.moveLeftTo(this.left + (new Box($('.right-column'))).left);
        return 'right';
    }
    // var referencedElementBox = new Box(referencedElement);
    // var newBox = new Box();
    // newBox.copy(this);

    // var maxDisplacementFromParentNote = 100;

    // // position in the left column
    // if(leftColumnPositionedBoxArray.length != 0) {
    //     if(newBox.top < leftColumnPositionedBoxArray[leftColumnPositionedBoxArray.length - 1].bottom) {
    //         newBox.moveTopTo(leftColumnPositionedBoxArray[leftColumnPositionedBoxArray.length - 1].bottom);
    //     }
    // }

    // if((newBox.top - referencedElementBox.bottom) > maxDisplacementFromParentNote) {
    //     // position in the right column 
    //     newBox.copy(this);
    //     if(rightColumnPositionedBoxArray.length != 0) {
    //         if(newBox.top < rightColumnPositionedBoxArray[rightColumnPositionedBoxArray.length - 1].bottom) {
    //             newBox.moveTopTo(rightColumnPositionedBoxArray[rightColumnPositionedBoxArray.length - 1].bottom);
    //         }
    //     }
    //     newBox.left = newBox.left + (new Box($('.right-column'))).left;
    //     this.copy(newBox);
    //     return 'right';
    // }

    // // keep in the left column
    // this.copy(newBox);
    // return 'left';
}

Box.prototype.toString = function() {
    var returnString = 'top : ' + this.top + '; ';
    returnString += 'bottom : ' + this.bottom + '; ';
    returnString += 'left : ' + this.left + '; ';
    returnString += 'right : ' + this.right + '; ';
    return returnString;
}