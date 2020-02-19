const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');




// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
  check('name', 'Please Enter a name').not().isEmpty(),
  check('email', 'Please Enter a Valid Email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json( {errors: errors.array()});
  }


  const { name, email, password} = await req.body;


  try {
    let user = await User.findOne({email: email});

    if(user){
      return res.status(400).json({msg: 'User Alredy Exists'});
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtsecret'), {
      expiresIn: 360000

    }, (err, token)=>{
      if(err) throw err;
      res.json({token})
    });

    

    console.log('User Created')

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

  }

  

});


module.exports = router;