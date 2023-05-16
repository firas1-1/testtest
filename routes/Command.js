const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Command = require('../model/Command');
const verifyToken = require('./verifyToken');

// CREATE a new command
const Fournisseur = require('../model/fournisseur');

// ...

router.get('/', async (req, res) => {
  try {
    // find all commands
    const commands = await Command.find();

    // perform a join with the Fournisseur model to get the fournisseur name
    const commandDetails = await Promise.all(commands.map(async (command) => {
      const fournisseur = await Fournisseur.findById(command.fournisseur); // <-- fix here
      return { ...command.toObject(), fournisseur: fournisseur ? fournisseur.Nom : ''  };
    }));

    // return the command details along with the fournisseur name
    res.json(commandDetails);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {

  try {
    

    const command = new Command({
      designation:req.body.designation,
      justification:req.body.justification,
      quantity:req.body.quantity,
      department:req.body.department,
      MR:req.body.MR,
      fournisseur:req.body.fournisseur,
      

    });
    console.log(command);
    const newCommand = await command.save();
    res.status(201).json(newCommand);
  } catch (err) {
    console.log(err); // log the error object to see what it contains

    res.status(400).json({ message: err.message });
  }
});


router.get('/:fournisseurId', async (req, res) => {
  try {
    const commands = await Command.find({ command: req.params.fournisseurId });
    res.json(commands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const updatedCommand = await Command.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.json(updatedCommand);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCommand = await Command.findByIdAndDelete(req.params.id);

    if (!deletedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.json({ message: "Command deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







module.exports = router;
