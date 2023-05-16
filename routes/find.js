const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fournisseur = require('../model/fournisseur');
const Command = require('../model/Command');

// GET all commands by fournisseur ID
router.get('/find/:id/commands', (req, res, next) => {
  const fournisseurId = req.params.id;
  
  Fournisseur.findById(fournisseurId)
    .then((fournisseur) => {
      if (!fournisseur) {
        // If fournisseur is not found, return 404 error
        return res.status(404).json({
          message: 'Fournisseur not found'
        });
      }

      Command.find({ fournisseur: fournisseur._id }).populate('fournisseur')
        .then((commands) => {
          res.status(200).json({
            commands: commands.map((command) => {
              return {
                _id: command._id,
                designation: command.designation,
                justification: command.justification,
                quantity:command.quantity,
                department:command.department,
                fournisseur: command.fournisseur
              }
            })
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
