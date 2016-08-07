var pixel_torelance = 1;



test("test round 1", function() {

	SimpleAlert.bt_close_class   = "default_class_close"
	
	var title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

	var message = "In ante quam, auctor sit amet bibendum eget, interdum nec est. Nam elementum risus a eleifend congue. Etiam nec leo et ex eleifend placerat vulputate id dolor. Sed egestas turpis ut accumsan aliquam. Sed congue nunc lacus, at egestas elit pellentesque sit amet. Cras feugiat nec augue sit amet maximus. Sed commodo, enim nec accumsan efficitur, nulla neque facilisis metus, nec hendrerit metus leo sit amet urna. Suspendisse tempus purus non commodo ultrices. In hac habitasse platea dictumst. Sed ornare leo vitae elit facilisis vestibulum. Nulla sollicitudin scelerisque nisl, ac auctor massa aliquam eu. Quisque tempor est sed lacus sodales ultricies luctus ac neque. Etiam eleifend sit amet ex non elementum.";

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");
	
	ba({
		title: title,
		message: message,
		openTime: 0,
		closeTime: 0
	});
	
	equal($('.ba_modal').length, 1, "showing one alert");

	equal($('.ba_shadow').length, 1, "showing one shadow");

	equal(Math.round($('.ba_shadow').css("opacity") * 10) / 10, 0.4, "level opacity ok");
	
	ok($('.ba_modal').is(':visible'), "alert is visible (if u see this alert u is ninja because it should be visible for a few ms)");

	equal($('.ba_modal .ba_modal_content .ba_modal_title').html(), title, "text from title alert is ok");

	equal($('.ba_modal .ba_modal_content .ba_modal_message').html(), message, "text from message alert is ok");


	ok((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "on center vertical and animation complete");

	ok((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "on center horizontal and animation complete");
	
	equal($('.ba_modal .ba_modal_bt input[type=button]').length, 1, "close button found, click it now");

	
	ok($('.ba_modal .ba_modal_bt input[type=button]').hasClass("default_class_close"), "SimpleAlert.bt_close_class work")
	$('.ba_modal .ba_modal_bt input[type=button]').click()

	equal($('.ba_shadow').length, 0, "no one shadow");

	equal($('.ba_modal').length, 0, "no one alert");
});

test("test round 2", function(assert) {

	SimpleAlert.bt_close_class = ""

	var done = assert.async();

	var title = "Nullam ac lacinia lacus. Donec dictum vel mi in consectetur.";

	var message = "Nulla sed orci metus. Vivamus libero felis, aliquet a dictum id, sodales vel lectus. Nam eget euismod augue.";

	var time = 500;

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");

	ba({
		title: title,
		message: message,
		openTime: time,
		closeTime: time
	});
	setTimeout(function(){
		// open operation is on half
		ok(($('.ba_shadow').css("opacity") * 1) > 0 && ($('.ba_shadow').css("opacity") * 1) < 0.4 , "opacity changing");
		notOk($('.ba_modal .ba_modal_bt input[type=button]').hasClass("default_class_close"), "SimpleAlert.bt_close_class work")
		
	},time/2);
	
	// alert is open where
	equal($('.ba_modal').length, 1, "showing one alert (maybe you see this)");

	equal($('.ba_shadow').length, 1, "showing one shadow");

	notEqual($(window).outerHeight(), (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()), "vertical is opening");
	
	notEqual($(window).outerWidth(), (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()), "horizontal is opening");

	notOk((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "vertical is opening");

	notOk((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "horizontal is opening");


	setTimeout(function(){
		// when alert is open completely
		var vp = (Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight())));

		ok(vp <= pixel_torelance, "on center vertical and animation complete");

		var hp = (Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth())));

		ok(hp <= pixel_torelance, "on center horizontal and animation complete");
		
		
		equal(Math.round($('.ba_shadow').css("opacity") * 10) / 10, 0.4, "max level opacity ok");

		$('.ba_modal .ba_modal_bt input[type=button]').click();

		setTimeout(function(){
			// close operation is on half
			notOk((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "vertical closing");

			notOk((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "horizontal closing");

			ok(($('.ba_shadow').css("opacity") * 1) > 0 && ($('.ba_shadow').css("opacity") * 1) < 0.4 , "opacity changing");
			
			notOk($('.ba_modal .ba_modal_bt input[type=button]').hasClass("default_class_close"), "SimpleAlert.bt_close_class work")

		},time/2);


		setTimeout(function(){
			// when alert is close completely
			equal($('.ba_shadow').length, 0, "no one shadow");

			equal($('.ba_modal').length, 0, "no one alert on test");

			done();
		},time);
	
	},time);
});

test("test round 3", function(assert) {
	SimpleAlert.bt_confirm_class = "test_bt_confirm_class"
	var done = assert.async();

	var w = [{
		title: "Lorem ipsum dolor sit amet.",
		message: "Sed rutrum fermentum venenatis. Ut ultricies lacus ac mi molestie, sit amet bibendum elit maximus. Sed tincidunt erat ut aliquet dapibus.",
		time: 0,
		closeText: "dignissim porta libero a imperdiet",
		confirmText: "molestie"
	},{
		title: "Suspendisse vel euismod risus.",
		message: "Curabitur posuere lacus nec dui gravida, eu bibendum est scelerisque. Fusce sollicitudin nunc vel ex lobortis, sit amet tincidunt diam sodales. Nunc ac porttitor ipsum. ",
		time: 0,
		closeText: "maximus",
		confirmText: "maximus orci sit amet faucibus"
	}];

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");

	ba({
		title:w[0]["title"],
		message:w[0]["message"],
		closeText:w[0]["closeText"],
		confirmText:w[0]["confirmText"],
		time:w[0]["time"],
		closeClass: "cb",
		confirmClass: "cr",
		closeOnClickShadow: true
	});

	equal($('.ba_shadow').length, 1, "one shadow");
	
	equal($('.ba_modal').length, 1, "one alert");

	equal($($(".ba_modal .ba_list_bt input[type=button]")[1]).css("color"), "rgb(0, 0, 255)", "close button css applied");
	
	equal($($(".ba_modal .ba_list_bt input[type=button]")[0]).css("color"), "rgb(255, 0, 0)", "close button css applied");

	equal($($(".ba_modal .ba_list_bt input[type=button]")[0]).outerWidth(), $($(".ba_modal .ba_list_bt input[type=button]")[1]).outerWidth(), "buttons with same width");

	equal($($(".ba_modal .ba_list_bt input[type=button]")[0]).outerWidth(), $($(".ba_modal .ba_list_bt input[type=button]")[1]).outerWidth(), "buttons with same width");

	window.call_back_test = "";

	ba({
		title:w[1]["title"],
		message:w[1]["message"],
		closeText:w[1]["closeText"],
		confirmText:w[1]["confirmText"],
		time:w[1]["time"],
		onClose: function(){
			window.call_back_test = "ok";
		} 
	});

	equal($('.ba_shadow').length, 2, "two shadow");
	
	equal($('.ba_modal').length, 2, "one alert");

	ok((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "on center vertical and animation complete");

	ok((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "on center horizontal and animation complete");

	equal($($(".ba_modal:first .ba_list_bt input[type=button]")[0]).outerWidth(), $($(".ba_modal:first .ba_list_bt input[type=button]")[1]).outerWidth(), "alert 1: buttons with same width");
	
	equal($($(".ba_modal:last .ba_list_bt input[type=button]")[0]).outerWidth(), $($(".ba_modal:last .ba_list_bt input[type=button]")[1]).outerWidth(), "alert 2: buttons with same width");

	notEqual(window.test,"ok", "callbacks not run yet");
	
	ok($($(".ba_modal:last .ba_list_bt input[type=button]")[0]).hasClass("test_bt_confirm_class"), "SimpleAlert.bt_confirm_class work")

	$('.ba_shadow').click()

	equal($('.ba_shadow').length, 1, "one shadow - close first alert by shadow click");
	
	equal($('.ba_modal').length, 1, "one alert - close first alert by shadow click");

	$($(".ba_modal:last .ba_list_bt input[type=button]")[1]).click()

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");

	equal(window.call_back_test,"ok", "callbacks done");

});