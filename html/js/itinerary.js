(function() {
	var Date = function(dict) {
		this.month = dict['month'];
		this.day = dict['day'];
		this.year = dict['year'];

		this.mapFullMonthName = function(monthInt) {
			monthInt = parseInt(monthInt);
			if (monthInt < 1 || monthInt > 12)
				return '';

			monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];

			return monthNames[monthInt - 1];
		}

		this.toHtml = function() {
			return this.mapFullMonthName(this.month) + ' ' +
					this.day + ', ' +
					this.year;
		};
	}

	var Event = function(dict) {
		this.title = dict['title'];
		this.time = dict['time'];
		this.location = dict['location'];

		this.toHtml = function() {
			return this.time + ' ' +
					this.title + ' ' +
					'<span class="grey">at ' + this.location + '</span>';
		};
	}

	$.getJSON('php/itinerary.php', function(data) {
		var itineraryId = '#itinerary';

		$.each(data, function(key, itineraryDate) {
			var date = new Date(itineraryDate['date']);
			itineraryHtml = "";
			itineraryHtml += '<b>' + date.toHtml() + '</b><br/>';
			itineraryHtml += '<ul>';
			for (var i = 0; i < itineraryDate.events.length; i++) {
				var event = new Event(itineraryDate.events[i]);
				itineraryHtml += '<li>' + event.toHtml() + '</li>';
			};
			itineraryHtml += '<ul/>';
			$(itineraryId).append(itineraryHtml);
		})
	});
})();