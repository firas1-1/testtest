const express = require('express');
const router = express.Router();
const Notification = require('../model/notification');
router.get('/', async (req, res) => {
    try {
      const notification = await Notification.find();
      res.json(notification);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/:department', async (req, res) => {
    const department = req.params.department;
    try {
      const notifications = await Notification.find({ department });
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.post('/', async (req, res) => {
    const notifications = new Notification({
      
      codeOracle: req.body.codeOracle,
      quantity: req.body.quantity,
      department: req.body.department,
      
      
    });
    try {
      const newNotif = await notifications.save();
      res.status(201).json(newNotif);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }); 
  
  router.delete('/:codeOracle', async (req, res) => {
    const codeOracle = req.params.codeOracle;
    try {
      const result = await Notification.deleteMany({ codeOracle });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  module.exports = router;

