const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');

router.post('/', (req, res) => {
  const results = [];
  const file = req.files.csv;
  const stream = fs.createReadStream(file.tempFilePath)
    .pipe(csv({ separator: ',' }));

  stream.on('data', (data) => {
    const product = new Product({
      ART: data.ART,
      THORN: data.THORN,
      codeOracle: data.codeOracle,
      Designation: data.Designation,
      quantity: data.quantity,
      alert_quantity: data.alert_quantity,
      department: data.department,
    });
    results.push(product.save());
  });

  stream.on('end', () => {
    Promise.all(results)
      .then(() => res.status(200).json({ message: 'Import successful' }))
      .catch((err) => res.status(500).json({ message: 'Import failed', error: err }));
  });
});

module.exports = router;
