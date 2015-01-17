$(function() {
	if($.browser.mobile) {
		var resize = function() {
			$('.fullpage').css({
				'min-height': $(window).height()
			});
		};

		resize();
	}
});