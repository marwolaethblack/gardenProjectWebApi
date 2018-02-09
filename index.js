'use strict'
const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express();

app.use(compression());
app.use(bodyParser.json());

app.set("view engine", "ejs"); //Removes the need to put .ejs at the end of ejs files
app.use(express.static(__dirname + "/public")); //serves css files




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
Plant.create({
	plantType: 'Vegetable',
	harvested: Date.now()
})
.catch(errors => {
	console.log(errors);
})

*/

app.get('/', (req, res) => {
	res.redirect('/api');
})

app.get('/api', (req, res) => {
	let routes = [];
	app._router.stack.forEach((r) => {
		  if (r.route && r.route.path){
		    routes.push({
		    	path: r.route.path,
		    	methods: r.route.methods
		    })
		  } 
	 }

	)

	console.log(Plant.attributes);

	res.render('./docs/docs', { routes: routes, 
								plant: {name: "Plant", ...Plant.attributes},
								light: {name: "Light", ...Light.attributes}
							})

})

app.route('/api/lights')
	.get((req,res) => {
		Light.findAll()
			.then(lights => {
				res.json(lights);
			})
			.catch(errors => {
				res.json(errors);
			})
	})
	.post((req, res) => {
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


app.route('/api/plants')
	.get((req,res) => {
		Plant.findAll()
			.then(plants => {
				res.json(plants);
			})
			.catch(errors => {
				res.json(errors);
				console.log(errors);
			})
	})
	.post((req, res) => {

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