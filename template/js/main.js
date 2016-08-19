function screen0(){
	$('iframe:not(#0)').fadeOut();
	$('#0').css('visibility','visible').fadeIn();

	var tools = ['BigDAWG', 'PostGRES', 'Vega'];
	updateTech(tools);
}

function screen1(){
	$('iframe:not(#1)').fadeOut();
	$('#1').css('visibility','visible').fadeIn();

	var tools = ['BigDAWG', 'S-Store', 'PostGRES'];
	updateTech(tools);
}

function screen2a(){
	$('iframe:not(#2)').fadeOut();
	$('#2').css('visibility','visible').fadeIn();

	var tools = ['Accumulo', 'BigDAWG', 'D4M', 'PostGRES'];
	updateTech(tools);
}

function screen3(){
	$('iframe:not(#3)').fadeOut();
	$('#3').css('visibility','visible').fadeIn();

	var tools = ['BigDAWG', 'MyriaL', 'MyriaX', 'PostGRES', 'Spark'];
	updateTech(tools);
}

function screen4a(){
    $('iframe:not(#4a)').fadeOut();
    $('#4a').css('visibility','visible').fadeIn();

    var tools = ['BigDAWG', 'Macrobase', 'PostGRES', 'SciDB'];
    updateTech(tools);
}

function screen4b(){
	$('iframe:not(#4b)').fadeOut();
	$('#4b').css('visibility','visible').fadeIn();

	var tools = ['BigDAWG', 'PostGRES', 'Tupleware'];
	updateTech(tools);
}

function screen5(){
	$('iframe:not(#5)').fadeOut();
	$('#5').css('visibility','visible').fadeIn();

	var tools = ['BigDAWG', 'Myria'];
	updateTech(tools);
}

function updateTech(tools){
	var tech = $('#tech');
	tech.empty();

	tech.append('<li class="tool_item" style="color: black; font-weight: bold;">Tools on This Screen:</li>')

	for (var i = 0; i < tools.length; i++) {
		tool = tools[i];
		text = '<li class="tool_item"><a href="#">' + tool + '</a></li>';
		text = '<li class="tool_item">' + tool + '</li>';
		tech.append(text);
	}

}


function loadCorrectFrame(){
	// load the page that the url tag is from
	var screen = window.location.hash.substring(1);
	switch(screen){
		case 'screen0':
			screen0();
			break;
		case 'screen1':
			screen1();
			break;
		case 'screen2a':
			screen2a();
			break;
		case 'screen3':
			screen3();
			break;
		case 'screen4a':
			screen4a();
			break;
		case 'screen4b':
			screen4b();
			break;
		default:
			screen0();
	}
}

loadCorrectFrame()