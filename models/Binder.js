const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Binder extends Model { }

Binder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "card",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "binder",
  }
);

module.exports = Binder;
