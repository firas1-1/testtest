const express = require('express');
const router = express.Router();
const DetailProduct = require('../model/detailProduct');

// GET all detailProduct records
router.get('/', async (req, res) => {
  try {
    const detailProducts = await DetailProduct.find();
    res.status(200).json(detailProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete('/', async (req, res) => {
  try {
    const result = await DetailProduct.deleteMany({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST a new detailProduct record
router.post('/', async (req, res) => {
  const now = new Date();
  let correction = '';
  if (req.body.correction === '1') {
  correction = 'quantity issued';
  } else if (req.body.correction === '0') {
  correction = 'quantity withdrawn';
  }
  const detailProduct = new DetailProduct({
  idProduct: req.body.idProduct,
  quantity: req.body.quantity,
  correction: correction,
  Date: req.body.Date,
  recentQuantity : req.body.recentQuantity,
  minimumStock : req.body.minimumStock,
  department : req.body.department,
  codeOracle: req.body.codeOracle
  });

  try {
    const newDetailProduct = await detailProduct.save();
    res.status(201).json(newDetailProduct);

    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/', async (req, res) => {
  try {
    const result = await DetailProduct.deleteMany({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET detailProduct records by department
router.get('/department/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const detailProducts = await DetailProduct.find({ department: department });
    if (detailProducts.length === 0) {
      return res.status(404).json({ message: 'No detailProducts found with department ' + department });
    }
    res.status(200).json(detailProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET detailProduct records by idProduct
router.get('/:idProduct', async (req, res) => {
  try {
    const idProduct = req.params.idProduct;
    const detailProducts = await DetailProduct.find({ idProduct: idProduct });
    if (detailProducts.length === 0) {
      return res.status(404).json({ message: 'No detailProducts found with idProduct ' + idProduct });
    }
    res.status(200).json(detailProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
