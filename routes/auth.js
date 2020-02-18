const express = require('express');

const router = express.Router();



// @route GET api/auth
// @desc  Get Logged in User
// @acces Private
router.get('/', (req, res) => {
  res.send('Get logged it user')
})


// @route   POST api/auth
// @desc    Authenticate a user & get token
// @access  Public
router.post('/', (req, res)=> {
  res.send('Log in User')
});

module.exports = router;


