const router = require('express').Router();
const userRoute = require('./userRoutes');
const binderRoute = require('./binderRoutes');

router.use('/user', userRoute);
router.use('/binder', binderRoute);




module.exports = router;