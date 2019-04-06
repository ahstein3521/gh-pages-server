const router = require('express').Router();
const http = require('http');
const zipcodes = require('zipcodes');


router.get('/:zipcode', (req, res, next) => {
	let route = 'http://api.openweathermap.org/data/2.5/weather';
	route += '?appid=' + process.env.openWeather;
	route += '&units=imperial';

	const location = zipcodes.lookup(req.params.zipcode);

	if (!location) {
		return res.error('Invalid zipcode');
	}

	route += '&lat=' + location.latitude;
	route += '&lon=' + location.longitude;
	// make openweather request
	http.get(route, response => {

		if (response.statusCode !== 200) {
		 	response.resume();
		 	res.status = response.statusCode;
		 	res.send(response);
		}

		let utf8 = '';

		response.setEncoding('utf8');

		response.on('data', d => {
			console.log('chunk', d);
			utf8 += d
		});
		
		response.on('end', () => {
			try {
				const json = JSON.parse(utf8);
				json.name = location.city + ', ' + location.state;
				json.location = location;
				res.send(json);
			} catch (err) {
				res.send(err);
			}
		});

		

	})	


});



module.exports = router;



