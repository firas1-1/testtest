const router = require('express').Router();
const Validation = require('../Validation');
const User = require('../model/User');

router.get('/:name', async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  });
  module.exports = router;
