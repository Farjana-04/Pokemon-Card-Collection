const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model { }

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
      
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_id:{
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "card",
  }
);

module.exports = Card;