const User = require('./User');
const Card = require('./Card');
const Binder = require('./Binder');

//using the many-to-many association between the "User" and "Card" models
User.belongsToMany(Card, { through: Binder, foreignKey: "user_id" });
//using the many-to-many association between the "Card" and "User" models
Card.belongsToMany(User, { through: Binder, foreignKey: "card_id" });


module.exports = { User, Card, Binder };


/*

User -> Binder <- Card
User hasMany Cards using the Binder

User <- Binder -> Cards

Card -> Binder <- User
Card hasMany User using the Binder

*/