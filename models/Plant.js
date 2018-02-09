module.exports = (sequelize, Sequelize) => {

	const Plant = sequelize.define('plant', {

		plantType: {
			type: Sequelize.STRING
		},

		datePlanted: {
			type: Sequelize.DATE, defaultValue: Sequelize.NOW
		},


	});

	Plant.sync();

	return Plant
}



