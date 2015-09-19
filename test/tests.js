var pixel_torelance = 1;

test("ba test round 1", function() {
	var title = "title from alert";

	var message = "message from alert";

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

	
	ok($('.ba_modal').is(':visible'), "alert is visible (if u see this alert u is ninja because it should be visible for a few ms)");

	equal($('.ba_modal .ba_modal_content .ba_modal_title').html(), title, "text from title alert is ok");

	equal($('.ba_modal .ba_modal_content .ba_modal_message').html(), message, "text from message alert is ok");


	ok((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "on center vertical and animation complete");

	ok((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "on center horizontal and animation complete");

	
	equal($('.ba_modal .ba_modal_bt button').length, 1, "close button found, click it now");

	$('.ba_modal .ba_modal_bt button').click()

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");
});
test("ba test round 2", function(assert) {
	
	var done = assert.async();

	var title = "title from alert 2";

	var message = "message from alert 2";

	var time = 50;

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");

	ba({
		title: title,
		message: message,
		openTime: time,
		closeTime: time
	});
	// alert is open where
	equal($('.ba_modal').length, 1, "showing one alert (maybe you see this)");

	equal($('.ba_shadow').length, 1, "showing one shadow");

	notEqual($(window).outerHeight(), (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()), "vertical is opening");
	
	notEqual($(window).outerWidth(), (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()), "horizontal is opening");

	notOk((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "vertical is opening");

	notOk((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "horizontal is opening");


	setTimeout(function(){
		// when alert is open completely
		ok((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "on center vertical and animation complete");

		ok((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "on center horizontal and animation complete");
		
		$('.ba_modal .ba_modal_bt button').click();

		setTimeout(function(){
			// close operation is on half
			notEqual((Math.abs($(window).outerHeight() - (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()))) <= pixel_torelance, "on center vertical and animation complete");

			notEqual((Math.abs($(window).outerWidth() - (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()))) <= pixel_torelance, "on center horizontal and animation complete");
		
		},time/2);


		setTimeout(function(){done(function(){
				// when alert is close completely
				equal($('.ba_shadow').length, 0, "no one shadow");

				equal($('.ba_modal').length, 0, "no one alert");
			
		});},time);
	
	},time);

});

/*
"no centro"
"sombra da janela"
"esta aberto"
"fecha ao apertar o botao"
"botoes do mesmo tamanho"
"mensagem"
"titulo"
"botao confirma"
"id unico"
"multiplas janelas"
testar tempo de abertura 
testar tempo de fechamento

*/