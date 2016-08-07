$(document).ready(function () {
    console.log('script is live');

    // var drawingDiv = $('.drawing');
    // var svgList = drawingDiv.find('svg');
    // console.log(svgList.first());
    // svgList.first().css('top', 0);
    // svgList.first().css('left', 0);

    // make all columns the same height
    var columnsList = $('.column');
    var maxHeight = 1000;
    columnsList.each(function() {
        if($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    columnsList.each(function() {
        $(this).height(maxHeight);
    });
});