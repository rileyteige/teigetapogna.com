(function() {
	$.getJSON('php/index.php', function(data) {
		$.each(data, function(key, val) {
			var filepath = 'content/images/' + val;

			var img = new Image();
			img.id = val;
			img.src = filepath;
			$('#photos').append(img);
		});
	});
})();