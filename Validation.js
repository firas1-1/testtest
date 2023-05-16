// Validation.js

const yup = require('yup');

const schema = yup.object().shape({
  name: yup.string().min(3),
  email: yup.string().email(),
  password: yup.string().min(3), 
});


const validateRegister = async (req, res, next) => {
  try {
    const validation = await schema.validate(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
const validateLogin = async (req, res, next) => {
  try {
    const validationLogin = await schema.validate(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

module.exports = {
  validateRegister,
  validateLogin
};

console.log('Validation.js has been loaded.');
