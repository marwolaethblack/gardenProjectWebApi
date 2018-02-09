module.exports = (sequelize, Sequelize) => {

	const Light = sequelize.define('light', {

		status: {
			type: Sequelize.ENUM('On', 'Off'),
			validate: {
				isIn: {
				  args: [['On', 'Off']],
				  msg: "Value must be On or Off"
				}

			}
		},


		dateFrom: {
			type: Sequelize.DATE
		},

		dateTo: {
			type: Sequelize.DATE
		}

	});

	Light.sync();

	return Light
}


