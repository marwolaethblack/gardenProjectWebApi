const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.set('port', process.env.PORT || 3110);





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

 




const Plant = sequelize.define('plant', {

	plantType: {
		type: Sequelize.STRING
	},

	datePlanted: {
		type: Sequelize.DATE, defaultValue: Sequelize.NOW
	},


})





app.get('/', (req,res) => {
	Plant.findAll()
		.then(plants => {
			res.json(plants);
		})
})

app.listen(app.get('port'), () => {
    console.log(`Server is listening on localhost:${app.get('port')}`);
});