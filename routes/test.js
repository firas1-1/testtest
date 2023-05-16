const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Detail = require('../model/detailProduct');

router.get('/', async (req, res) => {
  try {
    // query the database to retrieve the products with their details
    const products = await Product.find();
    const details = await Detail.find();

    // loop through the products and add their details
    const result = products.map(product => {
      const productDetails = details.filter(detail => detail.idProduct === product._id.toString());
      return {
        ...product.toObject(),
        details: productDetails
      };
    });

    // return the result as a JSON response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
