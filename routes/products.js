const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const verifyToken = require('./VerifyToken');
const csvtojson = require('csvtojson');
const multer = require('multer');
const XLSX = require('xlsx');

const upload = multer({ dest: 'uploads/' });

const Department = require ('../model/Department');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/import', upload.single('file'),async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonArray = XLSX.utils.sheet_to_json(sheet);
    await Product.insertMany(jsonArray);
    res.status(200).json({ message: 'XLSX file imported successfully', jsonArray });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/dep/:name', async (req, res) => {
  try {
    const department = await Department.findOne({ name: req.params.name });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const products = await Product.find({ department: department.name });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// CREATE a new product
router.post('/', async (req, res) => {
  const product = new Product({
    ART: req.body.ART,
    codeOracle: req.body.codeOracle,
    Description: req.body.Description,
    quantity: req.body.quantity,
    alert_quantity: req.body.alert_quantity,
    department: req.body.department
  });
  try {
    const department = await Department.findOne({ name: req.body.department });
    if (!department) {
      // If the department does not exist, return an error message
      return res.status(400).json({ message: "Department not found" });
    }
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:codeOracle', async (req, res) => {
  try {
    const produit = await Product.findOneAndDelete({ codeOracle: req.params.codeOracle });
    if (!produit) {
      return res.status(404).send();
    }
    res.send(produit);
    console.log('Product deleted')
  } catch (error) {
    res.status(500).send(error);
  }
});

// MIDDLEWARE to get a specific product by ID
/* async function getProduct(req, res, next) {
  try {
    Product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = Product;
  next();
}
*/




router.get('/codeOracle/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product.codeOracle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PATCH a specific product by ID
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    // update the fields that were sent in the request body
    if (req.body.ART) {
      product.ART = req.body.ART;
    }
    
    if (req.body.codeOracle) {
      product.codeOracle = req.body.codeOracle;
    }
    if (req.body.Description) {
      product.Description = req.body.Description;
    }
    if (req.body.quantity) {
      product.quantity = req.body.quantity;
    }
    if (req.body.alert_quantity) {
      product.alert_quantity = req.body.alert_quantity;
    }
    if (req.body.department) {
      product.department = req.body.department;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
