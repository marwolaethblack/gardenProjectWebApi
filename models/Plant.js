module.exports = (sequelize, Sequelize) => {

	const Plant = sequelize.define('plant', {

		plantType: {
			type: Sequelize.STRING,
			allowNull: false
		},

		datePlanted: {
			type: Sequelize.DATE, defaultValue: Sequelize.NOW,
			allowNull: false
		},

		harvested: {
			type: Sequelize.DATE
		}


	});

	Plant.sync();

	return Plant
}



