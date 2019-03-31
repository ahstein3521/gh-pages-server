const router = require('express').Router();
const http = require('http');

const ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather';

router.get('/:zipcode', (req, res, next) => {
	const zipcode = req.params.zipcode;
	const KEY = process.env.openWeather;

	http.get(`${ROOT_URL}?appid=${KEY}&units=imperial&zip=${zipcode}`, response => {

		 if (res.statusCode !== 200) {
		 	response.resume();
		 	res.send(response);
		 }

		let utf8 = '';

		response.setEncoding('utf8');

		response.on('data', d => utf8 += d);
		
		response.on('end', () => {
			try {
				res.send(JSON.parse(utf8))
			} catch (err) {
				res.send(err);
			}
		});

	})	


});



module.exports = router;



