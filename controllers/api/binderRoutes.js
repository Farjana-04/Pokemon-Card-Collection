const router = require("express").Router();
const { request } = require("express");
const { Binder, User, Card } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/add", withAuth, async (req, res) => {

  const userId = req.session.user_id;
  console.log(req.params)
  const cardId = req.body.card_id;
  const { name, imageUrl } = req.body;
  console.log(userId, cardId, name, imageUrl)
  let card = await Card.findOne({ where: { card_id: cardId } });
  if (!card) {
    card = await Card.create({ card_id: cardId, name, imageUrl })
  }

  try {
    let binder = await Binder.create({ user_id: userId, card_id: card.id });
    const userData = await User.findByPk(userId, {
        include: [
        {
          model: Card,
        },

      ]
    });
    console.log(userData)
    if (!userData) {
      res.status(404).json({ message: 'No binder found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete cards from binder
router.delete('/delete/:card_id', withAuth, async (req, res) => {
  // Get the authenticated user's ID
  const userId = req.session.user_id;
  // Get the ID of the card to delete
  const cardId = req.params.card_id;

  //Find the user and check if the card is in their binder
  const binder = await Binder.destroy({
    where: {
      user_id: userId,
      card_id: cardId
    }
  });

  if (!binder) {
    return res.status(404).json({ error: "Card not conneted with user" });
  }
  res.status(200).json({ message: "Card removed from binder successfully" });

});
module.exports = router;
