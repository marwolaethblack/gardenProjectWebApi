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
const Temperature = require('./models/Temperature')(sequelize, Sequelize);
const Image = require('./models/Image')(sequelize, Sequelize);

//
// Image.create({
// 	url: "www.google.com/asdjsajdjas"
// })
// .catch(errors => {
// 	console.log(errors);
// })



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
								light: {name: "Light", ...Light.attributes},
								temperature: {name: "Temperature", ...Temperature.attributes},
								image: {name: "Image", ...Image.attributes}
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

app.route('/api/temperatures')
	.get((req,res) => {
		Temperature.findAll()
			.then(temps => {
				res.json(temps);
			})
			.catch(err => {
				res.json(err);
			})
	})
	.post((req,res) => {
		const body = req.body;

		Temperature.create({...body})
			.then(createdTemp => {
				res.json(createdTemp);
			})
			.catch(err => {
				res.json(err);
			})

	})


app.route('/api/images')
	.get((req,res) => {
		Image.findAll()
			.then(imgs => {
				res.json(imgs);
			})
			.catch(err => {
				res.json(err);
			})
	})
	.post((req,res) => {
		const body = req.body;
		Image.create({...body})
			.then(ci => {
				res.json(ci);
			})
			.catch(err => res.json(err));
	})


app.listen(app.get('port'), () => {
    console.log(`Server is listening on localhost:${app.get('port')}`);
});