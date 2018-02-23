module.exports = (sequelize, Sequelize) => {

    const Temperature = sequelize.define('temperature', {

        temperature: {
            type: Sequelize.FLOAT,
            allowNull: false
        },

        humidity: {
            type: Sequelize.FLOAT,
            allowNull: false
        }


    });

    Temperature.sync();

    return Temperature
}


