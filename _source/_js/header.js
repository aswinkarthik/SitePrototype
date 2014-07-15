$(document).ready( function() {
	
	$(".right").on('click','li', function() {
		$.ajax({
			url: $(this).find('a').href
		}).done(
			menuHandler(this, ".right li")
		);
	});

	$(".sub-nav").on('click','dd', function() {
		menuHandler(this,".sub-nav dd");
	});

});

function menuHandler(menuItem, menuItemGroup) {
	$(menuItemGroup).removeClass("active");
	$(menuItem).addClass("active");	
}
