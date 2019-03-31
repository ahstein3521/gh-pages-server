const app = require('express')();
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

app.get('*', (req, res, next) => {

	res.send('hello..');
});

app.listen(process.env.PORT, function() {
	console.log(`Connected to port:${process.env.PORT}.`);
});

