module.exports = (sequelize, Sequelize) => {

    const Image = sequelize.define('image', {

        url: {
            type: Sequelize.STRING,
            allowNull: false
        },



    });

    Image.sync();

    return Image
}


