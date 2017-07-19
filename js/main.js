(function () {
	$("a[href*=\\#]").on("click", function (event) {
		if(!this.hash) return;

		event.preventDefault();

		$("html, body").animate({
			scrollTop: $(this.hash).offset().top
		}, 500);
	});
})();
