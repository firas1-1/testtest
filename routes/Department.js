const express = require('express');
const router = express.Router();
const Department = require('../model/Department');

router.post('/', async (req, res) => {
    const department = new Department({
      name:req.body.name,
      Date: req.body.Date,

  
    });
    try {
      const newDepartment = await department.save();
      res.status(201).json(newDepartment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.post('/', async (req, res) => {

  try {
    

    const department = new Department({
      name:req.body.name,
    });
    console.log(department);
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    console.log(err); // log the error object to see what it contains

    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deleteddep = await Department.findByIdAndDelete(req.params.id);

    if (!deleteddep) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) {
      return res.status(404).json({ message: 'Cannot find Department' });
    }
    // update the fields that were sent in the request body
    
    if (req.body.name) {
      dep.name = req.body.name;
    }
    
    const updatedDepartment = await dep.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


  router.get('/', async (req, res) => {
    try {
      const departments = await Department.find();
      res.json(departments);
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const dep = await Department.find();
      res.send(dep);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  module.exports=router;
