$(document).ready( function() {
	$.ajax({
		url: '/businesses/'
	}).done( function(response) {
		$('.content').html(response);
	});
});