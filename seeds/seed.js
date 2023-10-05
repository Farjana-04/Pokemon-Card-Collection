const sequelize = require('../config/connection');
const { User, Binder } = require('../models');

const userSeed = require('./userSeed.json');
const binderSeed = require('./binderSeed.json');

const seedDb = async () => {
  await sequelize.syn({ force: true });
  
  const users = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const binder of binderSeed) {
    await Binder.create({
      ...binder,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDb();