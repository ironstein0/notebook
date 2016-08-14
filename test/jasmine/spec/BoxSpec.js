describe('Box', function() {

    beforeAll(function() {
        // pass
    });

    describe('when something other than jquery object is passed as argument', function() {
        it('should throw CreationError', function() {
            var newBox = function(arg) {
                new Box(arg);
            };

            // unefined
            expect(function() {
                newBox(undefined);
            }).toThrowError('CreationError');

            // null
            expect(function() {
                newBox(null);
            }).toThrowError('CreationError');

            // integer
            expect(function() {
                newBox(1);
            }).toThrowError('CreationError');

            // float
            expect(function() {
                newBox(1.0);
            }).toThrowError('CreationError');

            // string
            expect(function() {
                newBox('s');
            }).toThrowError('CreationError');

            // boolean
            expect(function() {
                newBox(true);
            }).toThrowError('CreationError');
        });
    });

    describe('when a jquery object is passed as argument', function() {
        var newBox = function() {
            return new Box($('<div></div>'));
        };

        it('should not throw an error', function() {
            expect(newBox).not.toThrowError('CreationError');
        });

        it('should return a Box object', function() {
            expect(newBox() instanceof Box).toEqual(true);
        });

        it('should have top and left as expected', function() {
            var jqueryObject = $('<div></div>').appendTo('body');
            var unknownOffset = -9;

            var top = 103;
            var left = 22;
            var outerHeight = 111;
            var outerWidth = 2;

            jqueryObject.offset({top: top, left: left});
            jqueryObject.outerHeight(outerHeight);
            jqueryObject.outerWidth(outerWidth);
            var box = new Box(jqueryObject);
            expect(box.top).toEqual(top + unknownOffset);
            expect(box.left).toEqual(left + unknownOffset);
            expect(box.bottom).toEqual(top + unknownOffset + outerHeight);
            expect(box.right).toEqual(left + unknownOffset + outerWidth);
        });

    });

    xdescribe('when parameters of Box object are changed', function() {
        it('assigning negative values for top, left, bottom, right throws an error', function() {
            // todo : implement getter and setter methods for
            // top, left, bottom, right and id parameters of Box class
            // and implement type checking there 
            // write corresponding tests here
        });

        it('assigning non-integer or non-float values throws an error', function() {
            // pass
        });

        it('assigning float values assigns corresponding rounded integer values', function() {
            // pass
        })
    });
});