const express = require('express');
const router = express.Router();
const ResponseCommand = require('../model/response_command');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const User = require('../model/User');


// Create a new response_command

router.post('/', async (req, res) => {
  try {
    console.log('commmmmmmmmmmand',req.body.command_id);


    const responseCommand = new ResponseCommand({
      command_id: req.body.command_id,
      Respons: req.body.Respons,
      name: req.body.name,
      Status: req.body.Status,
      date: new Date()
    });
    const savedResponseCommand = await responseCommand.save();
    
    res.status(201).json(savedResponseCommand);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});


// Get all response_commands
router.get('/', async (req, res) => {
  try {
    const responseCommands = await ResponseCommand.find();
    res.send(responseCommands);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// Get a single response_command by command_id
router.get('/:command_id', async (req, res) => {
  try {
    const responseCommand = await ResponseCommand.findOne({ command_id: req.params.command_id });
    if (!responseCommand) {
      return res.status(404).json({ message: 'Response command not found' });
    }
    res.json(responseCommand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Get a single response_command by ID

// Update a response_command by ID


router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { Respons, name, Status } = req.body;

  try {
    const responseCommand = await ResponseCommand.findOne({command_id:id});
    let resp='accepted';
    let status='in process';
    if(Respons==='false'){
       resp = 'Rejected';
       status='rejected';
      
    };
    if ((name === 'kenna')&&(Respons==='true')) {
      resp = 'accepted';
      status='approved';

     };


    if (!responseCommand) {
      return res.status(404).json({ message: 'Response command not found' });
    }

    responseCommand.Respons = resp || responseCommand.Respons;
    responseCommand.name = name || responseCommand.name;
    responseCommand.Status = status || responseCommand.Status;


    const updatedResponseCommand = await responseCommand.save();

    res.json(updatedResponseCommand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;



// Delete a response_command by ID
router.delete('/:id', async (req, res) => {
  try {
    const responseCommand = await ResponseCommand.findByIdAndDelete(req.params.id);
    if (!responseCommand) {
      return res.status(404).send({ error: 'Response command not found' });
    }
    res.send({ message: 'Response command deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.delete('/', async (req, res) => {
  try {
    const result = await ResponseCommand.deleteMany({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
