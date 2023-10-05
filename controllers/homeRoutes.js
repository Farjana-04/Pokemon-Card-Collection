const router = require('express').Router();
const { Binder, User } = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
  console.log(req.session)
  res.render("home", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
});
});


router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
  // const { username } = req.body;

  // if (existingUsernames.has(username)) {
  //   res.status(409).send('Username already exists');
  // } else {
    
  //   existingUsernames.add(username);
  //   res.send('Signup successful');
  // }
});


router.get("/binder", withAuth, async (req, res) => {
 res.render("binder",{
  logged_in: req.session.logged_in,
    user_id: req.session.user_id
 })
});

router.get("/search", async (req, res) => {
  const pokemonName = req.query.name;
  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}&limit=5`
    );
    const data = await response.json();
    const cards = data.data;
    // console.log(cards)
    res.render("pokemon", { cards,logged_in: req.session.logged_in, });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

module.exports = router;