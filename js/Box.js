var Box = function(jqueryObject) {
    if(jqueryObject != undefined) {
        var offset = jqueryObject.offset();
        this.top = offset.top;
        this.left = offset.left;
        this.bottom = this.top + jqueryObject.outerHeight();
        this.right = this.left + jqueryObject.outerWidth();
    }
}

Box.prototype.copy = function(box) {
    this.top = box.top;
    this.left = box.left;
    this.bottom = box.bottom;
    this.right = box.right;
}

// returns true if the point represented by (x,y)
// lies inside this box isntance
Box.prototype.isInside = function(x, y) {
    if(((x > this.left) && (x < this.right)) && ((y > this.top) && (y < this.bottom))) {
        return true;
    } return false;
}

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

Box.prototype.positionBox = function(postionedBoxArray) {
    // console.log(this);
    var newBox = new Box();
    newBox.copy(this);
    console.log('-----------------------------------')
    for(var i=0; i<postionedBoxArray.length; i++) {
        // newBox.copy(this);
        var displacement = postionedBoxArray[i].avoidOverlap(this);
        console.log(postionedBoxArray[i]);
        console.log(this);
        console.log(displacement);
        newBox.top += displacement[0];
    }
    this.copy(newBox);
}

Box.prototype.toString = function() {
    var returnString = 'top : ' + this.top + '; ';
    returnString += 'bottom : ' + this.bottom + '; ';
    returnString += 'left : ' + this.left + '; ';
    returnString += 'right : ' + this.right + '; ';
}