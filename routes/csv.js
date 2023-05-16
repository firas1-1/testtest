const express = require('express');
const router = express.Router();
const csvtojson = require('csvtojson');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// Database connection URI
const uri = 'mongodb://localhost:27017';

// Route to import a CSV file into the database
router.post('/', async (req, res) => {
  try {
    // Check if a CSV file was uploaded
    if (!req.files || !req.files.csvFile) {
      return res.status(400).json({
        success: false,
        message: 'No CSV file uploaded.'
      });
    }

    // Convert the CSV file to JSON format
    const csvFilePath = req.files.csvFile.tempFilePath;
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // Connect to the database
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    // Insert the JSON data into the database
    const result = await db.collection('mycollection').insertMany(jsonArray);

    // Disconnect from the database
    await client.close();

    // Return a success message
    res.json({
      success: true,
      message: 'CSV file imported successfully.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error importing CSV file.'
    });
  }
});

module.exports = router;
