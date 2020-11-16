'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.party.belongsTo(models.faveDrink)
    }
  };
  party.init({
    guestId: DataTypes.INTEGER,
    faveRecipeId: DataTypes.INTEGER,
    faveDrinkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'party',
  });
  return party;
};