$(function() {
	if(jQuery.browser.mobile) {
		var resize = function() {
			$('.page').css({
				'min-height': $(window).height()
			});
		};

		resize();
		$(window).resize(resize);
	}
});