'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.guest.belongsTo(models.user)
      models.guest.hasMany(models.party)


    }
  };
  guest.init({
    name: DataTypes.STRING,
    likes: DataTypes.STRING,
    dislikes: DataTypes.STRING,
    allergies: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guest',
  });
  return guest;
};