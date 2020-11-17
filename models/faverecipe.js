'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faveRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.faveRecipe.belongsTo(models.user)
      models.faveRecipe.hasMany(models.party)

    }
  };
  faveRecipe.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    apiId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'faveRecipe',
  });
  return faveRecipe;
};