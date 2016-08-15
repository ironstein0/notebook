describe('Box.js', function() {

    describe('Box', function() {
        describe('when something other than jquery object or undefined is passed as argument', function() {
            it('should throw CreationError', function() {
                var newBox = function(arg) {
                    new Box(arg);
                };

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

        describe('when nothing or undefined object is passed as argument', function() {
            var newBox = function(arg) {
                newBox(arg);
            };
            it('should not throw an error', function() {
                expect(function() {
                    newBox(undefined);
                }).not.toThrowError('CreationError');

                expect(function() {
                    new Box();
                }).not.toThrowError('CreationError');
            });

            it('should return a box object', function() {
                // undefined
                expect(function() {
                    newBox(undefined);
                }).not.toThrowError('CreationError');

                // no args
                expect(function() {
                    newBox();
                }).not.toThrowError('CreationError');

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

            it('should have top, left, bottom, right and id as expected', function() {
                var jqueryObject = $('<div data-sidenote="test"></div>').appendTo('body');
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
                expect(box.id).toEqual('test');
            });

        });

        describe('when parameters of Box object are changed', function() {
            var box;
            beforeEach(function() {
                box = new Box();
            });

            it('assigning negative values for top, left, bottom or right throws an error', function() {
                expect(function() {
                    box.top = -10;
                }).toThrowError('ValueError');

                expect(function() {
                    box.left = -10;
                }).toThrowError('ValueError');

                expect(function() {
                    box.bottom = -22;
                }).toThrowError('ValueError');

                expect(function() {
                    box.right = -33;
                }).toThrowError('ValueError');
            });

            it('assigning non-number values throws an error', function() {
                expect(function() {
                    box.top = 'abcd';
                }).toThrowError('ValueError');

                expect(function() {
                    box.left = undefined;
                }).toThrowError('ValueError');

                expect(function() {
                    box.bottom = [1,2,3];
                }).toThrowError('ValueError');

                expect(function() {
                    box.right = null;
                }).toThrowError('ValueError');
            });

            it('assigning a non-negative integer changes the value', function() {
                box.top = 0; box.left = 20; box.bottom = 10; box.right = 144;
                expect(box.top).toEqual(0);
                expect(box.left).toEqual(20);
                expect(box.bottom).toEqual(10);
                expect(box.right).toEqual(144);
            });

            it('assigning float values assigns corresponding rounded integer values', function() {
                box.top = 1.223; box.left = 1.5; box.bottom = 1.77; box.right = 10.3;
                expect(box.top).toEqual(1);
                expect(box.left).toEqual(2);
                expect(box.bottom).toEqual(2);
                expect(box.right).toEqual(10);
            });

            it('assigning value to id throws error', function() {
                expect(function() {
                    box.id = 10;
                }).toThrowError('AccessError');
            });
        });
    });

    describe('Box.prototype.copy', function() {
        it('should copy everthing correctly', function() {
            var box1 = new Box($('<div data-sidenote="test"></div>').appendTo($('body')));
            box1.top = 10; box1.left = 12; box1.bottom = 22; box1.right = 333;
            var box2 = new Box();
            box2.copy(box1);
            expect(box2.top).toEqual(10);
            expect(box2.left).toEqual(12);
            expect(box2.bottom).toEqual(22);
            expect(box2.right).toEqual(333);
            expect(box2.id).toEqual('test')
        });
    });

    describe('Box.prototype.moveTopTo', function() {

        var box;
        beforeEach(function() {
            box = new Box();
            box.top = 10; box.left = 10; box.bottom = 20; box.right = 20;
        });
        
        it('should throw error when incorrect value for top is provided', function() {
            expect(function() {
                box.moveTopTo(-10);
            }).toThrowError('ValueError');
        });

        it('should move the entire box when correct value for top is provided', function() {
            box.moveTopTo(100);
            expect(box.top).toEqual(100);
            expect(box.bottom).toEqual(110);
            expect(box.left).toEqual(10);
            expect(box.right).toEqual(20);
        });
    });

    describe('Box.prototype.moveLeftTo', function() {

        var box;
        beforeEach(function() {
            box = new Box();
            box.top = 10; box.left = 10; box.bottom = 20; box.right = 20;
        });
        
        it('should throw error when incorrect value for left is provided', function() {
            expect(function() {
                box.moveLeftTo(-10);
            }).toThrowError('ValueError');
        });

        it('should move the entire box when correct value for left is provided', function() {
            box.moveLeftTo(100);
            expect(box.top).toEqual(10);
            expect(box.bottom).toEqual(20);
            expect(box.left).toEqual(100);
            expect(box.right).toEqual(110);
        });
        
    });

    describe('Box.prototype.avoidOverlap', function() {
        it('should work correctly when box2 overlaps box1 from below', function() {
            /*
             *     (10, 10) +---------------------------+ (100, 10)
             *              |              BOX1         |
             *              |   (30, 30)                |
             *              |   +---------------------------+ (120, 30)     |
             *              |   |                       |   |               |
             *              |   |                       |   |               |
             *     (10, 50) +---|-----------------------+   |               \/
             *                  |                           |
             *                  |          BOX2             |
             *         (30, 70) +---------------------------+ (120, 70)
             */
             var box1 = new Box();
             box1.top = 10; box1.left = 10; box1.bottom = 50; box1.right = 100;
             var box2 = new Box();
             box2.top = 30; box2.left = 30; box2.bottom = 70; box2.right = 120;

             var displacement = box1.avoidOverlap(box2);
             expect(displacement[0]).toEqual(20);
             expect(displacement[1]).toEqual(0);
        });

        it('should work correctly when box2 overlaps box1 from above', function() {
            /*
             *     (10, 10) +---------------------------+ (100, 10)         |
             *              |              BOX2         |                   |
             *              |   (30, 30)                |                   |
             *              |   +---------------------------+ (120, 30)     |
             *              |   |                       |   |               |
             *              |   |                       |   |               |
             *     (10, 50) +---|-----------------------+   |               |
             *                  |                           |               |
             *                  |          BOX1             |               |
             *         (30, 80) +---------------------------+ (120, 80)     \/
             */
             var box1 = new Box();
             box1.top = 30; box1.left = 30; box1.bottom = 80; box1.right = 120;
             var box2 = new Box();
             box2.top = 10; box2.left = 10; box2.bottom = 50; box2.right = 100;

             var displacement = box1.avoidOverlap(box2);
             expect(displacement[0]).toEqual(70);
             expect(displacement[1]).toEqual(0);
        });

        it('should work correctly when box2 is below box1', function() {
            /*
             *    (10, 10) +-----------------------+ (100, 10)
             *             |          BOX1         |
             *             |                       |
             *    (10, 30) +-----------------------+ (100, 30)
             *
             *        (30, 50) +---------------------------+ (120, 50)
             *                 |           BOX2            |
             *                 |                           |
             *        (30, 80) +---------------------------+ (120, 80)
             */
             var box1 = new Box();
             box1.top = 10; box1.left = 10; box1.bottom = 30; box1.right = 100;
             var box2 = new Box();
             box2.top = 50; box2.left = 30; box2.bottom = 80; box2.right = 120;
             var displacement = box1.avoidOverlap(box2);
             expect(displacement[0]).toEqual(0);
             expect(displacement[1]).toEqual(0);
        });

        it('should work correctly when box2 is above box1', function() {
            /*
             *    (10, 10) +-----------------------+ (100, 10)              |
             *             |          BOX2         |                        |
             *             |                       |                        |
             *    (10, 30) +-----------------------+ (100, 30)              |
             *                                                              |
             *        (30, 50) +---------------------------+ (120, 50)      |
             *                 |           BOX1            |                |
             *                 |                           |                |
             *        (30, 80) +---------------------------+ (120, 80)      \/
             */
             var box2 = new Box();
             box2.top = 10; box2.left = 10; box2.bottom = 30; box2.right = 100;
             var box1 = new Box();
             box1.top = 50; box1.left = 30; box1.bottom = 80; box1.right = 120;
             var displacement = box1.avoidOverlap(box2);
             expect(displacement[0]).toEqual(70);
             expect(displacement[1]).toEqual(0);
        });
    });

    

 });