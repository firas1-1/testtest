const express = require('express');
const router = express.Router();
const Fournisseur = require('../model/fournisseur');
const Command = require('../model/Command');



router.post('/', async (req, res) => {
    try {
      const fournisseur = new Fournisseur(req.body);
      await fournisseur.save();
      res.status(201).send(fournisseur);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const fournisseurs = await Fournisseur.find();
      res.send(fournisseurs);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findById(req.params.id);
      if (!fournisseur) {
        return res.status(404).send();
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  router.patch('/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!fournisseur) {
        return res.status(404).send();
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
      if (!fournisseur) {
        return res.status(404).send();
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(500).send(error);
    }
  });
 
  
  module.exports=router;
  