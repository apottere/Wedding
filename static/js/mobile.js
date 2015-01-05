$(function() {
	if(jQuery.browser.mobile) {
		var resize = function() {
			$('.page').css({
				'height': $(window).height()
			});
		};

		resize();
		$(window).resize(resize);
	}
});