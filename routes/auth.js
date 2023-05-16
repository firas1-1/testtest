const router = require('express').Router();
const Validation = require('../Validation');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Department = require ('../model/Department');


router.post('/register', Validation.validateRegister, async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('A user with that email already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user object with the hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      department: req.body.department,
      Tel: req.body.Tel,
      Gender: req.body.Gender,
      Role: req.body.Role

    });
    try {
      const department = await Department.findOne({ name: req.body.department });
      if (!department) {
        // If the department does not exist, return an error message
        return res.status(400).json({ message: "Department not found" });
      }
      const savedUser = await newUser.save();
      res.send({newUser: newUser});
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log('errr')
    }

    // Save the new user to the database

    // Send the saved user back in the response
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    // update the fields that were sent in the request body
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.body.password) {
      user.password = hashedPassword;
    }
    if (req.body.Tel) {
      user.Tel = req.body.Tel;
    }
    if (req.body.department) {
      user.department = req.body.department;
    }
    if (req.body.Role) {
      user.Role = req.body.Role;
    }
    if (req.body.Gender) {
      user.Gender = req.body.Gender;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    // Update the fields that were sent in the request body
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.Tel) {
      user.Tel = req.body.Tel;
    }
    if (req.body.department) {
      // Check if the department exists
      const department = await Department.findOne({ name: req.body.department });
      if (!department) {
        return res.status(400).json({ message: 'Department not found' });
      }
      user.department = req.body.department;
    }
    if (req.body.Role) {
      user.Role = req.body.Role;
    }

    const updatedUser = await user.save();
    
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch('/dep/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    // Update the fields that were sent in the request body
    
      // Check if the department exists
      const department = await Department.findOne({ name: req.body.department });
      if (!department) {
        return res.status(400).json({ message: 'Department not found' });
      }
      user.department = req.body.department;
    
    

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/login',
 //Validation.validateLogin,
  async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ name: req.body.name });
    if (!existingUser) {
      return res.status(400).send('email or password is wrong');
    }
    
    // check password
    const Validpass = await bcrypt.compare(req.body.password, existingUser.password)
    if (!Validpass) {
      return res.status(400).send('invalid password');
    }
    
    // Generate a JWT token and send it back in the response
    const token = jwt.sign({userId: existingUser._id,username:existingUser.name,department:existingUser.department,Role:existingUser.Role}, process.env.JWT_SECRET);
    res.send({token: token});
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
    
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
