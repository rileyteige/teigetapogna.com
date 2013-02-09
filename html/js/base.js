var TITLE = "We're Gettin' Hitched!";
var HEADER = 'Riley & Angie';

$().ready(function(){
	buildTemplate();
});

function buildTemplate() {
	buildTitle();
	buildHeader();
	buildLinks();
	initBody();
	setupAnimations();
	hideLinksInit();
}

function initBody() {
	loadTextFileIntoTag('main.html', document.getElementById('content'));
}

function buildTitle() {
	$('head').append('<title>' + TITLE + '</title>');
}

function buildHeader() {
	$('#header').hide();
	$('#header').append(HEADER);
	$('#header').show();
}

function setupAnimations() {
	var fast = 100 // milliseconds
	var slow = 800
        
    $("#links button").hover(
    	function() {
    		$(this).stop().animate({ 'color':'#A35A07' }, fast);
    	},
    	function() {
    		$(this).stop().animate({ 'color':'black' }, slow);
    	}
    );
}

function hideLinksInit() {
	$("#links li").each(function() { $(this).hide(); });
	showLinks();
}

var links = {
		"main.html":"Home",
		"stories.html":"Our Stories",
		"story.html":"Our Story",
		"photos.html":"Photos",
		"bulletin.html":"Bulletin Board",
		"registry.html":"Gift Registries",
		"itinerary.html":"Itinerary",
		"accomodations.html":"Accomodations"
};

function buildLinks() {
	$("#links").append('<ul class="sidebar"></ul>');

	for (var key in links) {
		var caption = links[key];
		$("#links ul")
			.append("<li><button onclick=\"loadTextFileIntoTag('" + key + "', '#content')\">" + caption + "</button></li>");
	}
}

function showLinks() {
	speed = "fast";
	$("#links li").first().show(speed, function doNext() {
		$(this).next("#links li").show(speed, doNext);
	});
}

function loadTextFileIntoTag(filename, htmlName) {
	$(htmlName).load(filename);
}

function dictionaryKeys (dict) {
	var keys = [];
	
	for (var key in dict) {
		if (obj.hasOwnProperty(key)) {
			keys.push(key);
		}
	}
	
	return keys;
}

$("body").on({
    // When ajaxStart is fired, add 'loading' to body class
    ajaxStart: function() {
        $(this).addClass("loading");
    },
    // When ajaxStop is fired, rmeove 'loading' from body class
    ajaxStop: function() {
        $(this).removeClass("loading");
    }    
});
