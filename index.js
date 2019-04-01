const path = require('path');
const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo, { useNewUrlParser: true })
	.then(err => {
		///// this promise is returning what looks like the mongoose instance object
		//// not an error object which is what it says in the doc
		console.log('Connected to mongoDb');
		// if (err) {
		// 	console.log('Error connecting to mongoDb', err)
		// } else {
		// 	console.log('Connected to mongoDb')
		// }
	});

app.all('*', cors());

// bootstrap controllers to app
const controllers = fs.readdirSync(path.resolve(__dirname, './controllers'));

controllers.forEach(fileName => {
	const route = '/' + fileName.replace('.js', '');
	const _module = require(path.resolve(__dirname, './controllers/', fileName));

	app.use(route, _module)
});

app.get('*', (req, res, next) => {

	res.send('I don\'t know what you were hoping to find, but it\'s not here.');
});

app.listen(process.env.PORT, function() {
	console.log(`Connected to port:${process.env.PORT}.`);
});

