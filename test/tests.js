test("ba test round 1", function() {
	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");
	
	ba({
		message: "testing it",
		openTime: 0,
		closeTime: 0
	});
	
	equal($('.ba_modal').length, 1, "showing one alert");
	
	ok($('.ba_modal').is(':visible'), "alert is visible (if u see this alert u is ninja because it should be visible for a few ms)");
	
	equal($(window).outerHeight(), (($('.ba_modal').offset().top * 2) + $('.ba_modal').outerHeight()), "on center vertical and animation complete");
	equal($(window).outerWidth(), (($('.ba_modal').offset().left * 2) + $('.ba_modal').outerWidth()), "on center horizontal and animation complete");
	
	equal($('.ba_modal .ba_modal_bt button').length, 1, "close button found, click it now");

	$('.ba_modal .ba_modal_bt button').click()

	equal($('.ba_shadow').length, 0, "no one shadow");
	
	equal($('.ba_modal').length, 0, "no one alert");
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