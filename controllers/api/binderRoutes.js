const router = require("express").Router();
const { request } = require("express");
const { Binder, User, Card } = require("../../models");
const withAuth = require("../../utils/auth");


// router.post("/", withAuth, (req, res) => {
//   // check the session
//   if (req.session) {
//       id: req.body.id,
//       name: req.body.name,
//       // use the id from the session
//       user_id: req.session.user_id,
//     })
//       .then((dbBinderData) => res.json(dbBinderData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

router.post("/add", withAuth, async (req, res) => {
  
  const userId = req.session.user_id; 
  console.log(req.params)
  const cardId = req.body.card_id; 
  const {name,imageUrl} = req.body;
 console.log(userId,cardId,name,imageUrl)
  let card = await Card.findOne({where:{card_id:cardId}});
  if(!card){
    card = await Card.create({card_id:cardId, name, imageUrl})
  }
  // Check if the card is not already in the binder
  // const user = await User.findByPk(userId);
  try {
    let binder = await Binder.create({user_id:userId, card_id: card.id});
    const userData = await User.findByPk(userId, {
      
      include: [
        {
          model: Card,

          // attributes: ['user_id', 'card_id']
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
//   if (user.binder.includes(cardId)) {
//     return res.status(400).json({ error: "Card already in binder" });
//   }
//   user.binder.push(cardId);
//   await user.save();

//   res.status(200).json({ message: "Card added to binder successfully" });
// });

router.delete('/delete/:card_id', withAuth, async (req, res) => {
  // Get the authenticated user's ID
  const userId = req.session.user_id; 
  // Get the ID of the card to delete
  const cardId = req.params.card_id;
// DELETE a binder
// router.delete('/:id', async (req, res) => {
//   try {
//     const binderData = await Binder.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!binderData) {
//       res.status(404).json({ message: 'No binder found with that id!' });
//       return;
//     }

//     res.status(200).json(binderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

  // const cardIndex = user.binder.indexOf(cardId);

  // if (cardIndex === -1) {
  //   return res.status(404).json({ error: "Card not found in binder" });
  // }

  // // Remove the card from the binder
  // user.binder.splice(cardIndex, 1);
  // await user.save();

  res.status(200).json({ message: "Card removed from binder successfully" });

});
module.exports = router;
