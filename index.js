'use strict'
const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express();

app.use(compression());
app.use(bodyParser.json());



app.set('port', process.env.PORT || 3110);

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite',
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });


const Plant = require('./models/Plant')(sequelize, Sequelize);
const Light = require('./models/Light')(sequelize, Sequelize);

/*
Light.create({
	status: 'FFFF',
	dateFrom: Date.now(),
	dateTo: Date.now() + 100
})
.catch(errors => {
	console.log(errors);
})
*/

app.get('/api/lights', (req,res) => {
	Light.findAll()
		.then(lights => {
			res.json(lights);
		})
		.catch(errors => {
			res.json(errors);
		})
});

app.post('/api/lights', (req, res) => {

	const body = req.body;

	Light.create({
		...body
	})
	.then(createdLight => {
		res.json(createdLight);
	})
	.catch(err => {
		res.json(err);
	})
})

app.get('/api/plants', (req,res) => {
	Plant.findAll()
		.then(plants => {
			res.json(plants);
		})
		.catch(errors => {
			res.json(errors);
		})
});

app.post('api/plants', (req, res) => {

	const body = req.body;

	Plant.create({
		...body
	})
	.then(createdPlant => {
		res.json(createdPlant);
	})
	.catch(err => {
		res.json(err);
	})
})

app.listen(app.get('port'), () => {
    console.log(`Server is listening on localhost:${app.get('port')}`);
});