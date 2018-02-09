module.exports = (sequelize, Sequelize) => {

	const Light = sequelize.define('light', {

		status: {
			type: Sequelize.ENUM('On', 'Off'),
			validate: {
				isIn: {
				  args: [['On', 'Off']],
				  msg: "Value must be On or Off"
				}

			},
			allowNull: false
		},


		dateFrom: {
			type: Sequelize.DATE,
			allowNull: false
		}

	});

	Light.sync();

	return Light
}


