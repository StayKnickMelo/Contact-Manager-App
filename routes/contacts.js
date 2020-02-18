const express = require('express');

const router = express.Router();

// @route     GET api/contacts
// @desc      Get user contacts
// @access    Private
router.get('/', (req, res) => {
  res.send('Get contacts')
});

// @route     POST api/contacts
// @desc      Add a contac to a user
// @access    Pivate
router.post('/', (req,res)=>{
  res.send('Add a contact')
});

// @route     PUT api/contacts/:id
// @desc      Update a contact
// @access    Pivate
router.put('/:id', (req, res)=> {
  res.send('Contact updated');
});

// @route     DELETE api/contacs/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', (req, res)=> {
  res.send('Contact Deleted')
});


module.exports = router;