var scrollUp = function() {
	$('html, body').animate({
		  scrollTop: $('#header').offset().top
		}, 500);
}

var scrollDown = function() {
	$('html, body').animate({
		  scrollTop: $('#footer').offset().top
		}, 500);
}

$(window).load(function () {
	new Notebook(3, 6, 3);

	// if an anchor tag with href containing id of another element on the 
	// page is clicked, then scroll to that part instead of the default
	// behaviour
	$(document).on('click', 'a', function(event){
		if($.attr(this, 'href').charAt(0) == '#') {
	    	event.preventDefault();
	    	$('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top - 10
		    }, 500);
		}
	});

});