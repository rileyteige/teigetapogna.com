(function() {
	var Address = function(street, city, state, zipCode) {
		this.street = street;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.toHtml = function() {
			return this.street + '<br />' + city + ', ' + state + ' ' + zipCode;
		}
	};

	var makeLink = function(content, url) {
		return url != '' ? '<a href="' + url + '">' + content + '</a>' : '';
	};

	var makeImage = function(imageUrl, url) {
		return makeLink('<img src="' + imageUrl + '"></img>', url);
	};

	var addRow = function(name, url, imageUrl, address, directions, drive, phone, extras) {
		htmlImage = null;
		htmlImage = !(imageUrl == null || imageUrl === "") ? makeImage(imageUrl, url) : null;
		$('#lodgings').append('<tr>' +
			'<td>' +
				makeLink(name, url) + '<br />' +
				(htmlImage != null ? htmlImage + '<br />' : '') +
				address + '<br />' +
				phone + '<br />' +
			'</td>' +
			'<td>' +
				makeLink('Directions to Northstar', directions) + '<br />' +
				(drive != '' ? '~' : '') + drive + '<br />' +
			'</td>' +
			'<td>' +
				extras +
			'</td>' +
			'</tr>');
	};

	var replaceAll = function(txt, replace, new_text) {
		return txt.replace(new RegExp(replace, 'g'), new_text);
	};

	$.getJSON('php/lodgings.php', function(data) {
		$.each(data, function(key, lodging) {
			name = lodging['name'];
			url = lodging['url'];
			imageUrl = lodging['image'];
			phone = lodging['phone'];
			address = lodging['address'];
			extras = new String(lodging['extras']);
			directions = lodging['directions'];
			drive = lodging['drive'];

			extras = extras.replace(/[\[]+/g, '<');
			extras = extras.replace(/[\]]+/g, '>');

			addRow(name, url, imageUrl, new Address(address['street'], address['city'], address['state'], address['zipCode']).toHtml(), directions, drive, phone, extras);
		});
	});
})();