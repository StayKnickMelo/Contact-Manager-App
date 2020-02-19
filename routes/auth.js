const express = require('express');
const router = express.Router();

// to authenticate user
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



// @route GET api/auth
// @desc  Get Logged in User
// @acces Private
router.get('/',auth, async (req, res) => {
  
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});


// @route   POST api/auth
// @desc    Authenticate a user & get token
// @access  Public
router.post('/', [
  check('email', 'Please Include a Valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: `User doesn't exist` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Password' });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtsecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.json({token})
    });

    console.log('User Logged In');

  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server Error')

  }
  
});

module.exports = router;


