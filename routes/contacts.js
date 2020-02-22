const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contacts = require('../models/Contacts');
const auth = require('../middleware/auth');

// @route     GET api/contacts
// @desc      Get user contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    // Getting contacts for a specific user
    const contacts = await Contacts.find({ user: req.user.id }).sort({ date: -1 });

    res.json(contacts);
    console.log('Contacts Received')

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
});

// @route     POST api/contacts
// @desc      Add a contac to a user
// @access    Pivate
router.post('/', [auth, [
  check('name', 'Please Enter A Name').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Check here  for ERRORS Send
    // To get single error simply send one error
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    // Check for existing contact of a specific user
    let newContact = await Contacts.find({ user: req.user.id }).findOne({ email: email })

    if (newContact) {
      return res.status(400).json({ msg: 'Contact Already Exists' });
    }

    newContact = new Contacts({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();

    
    
    res.json(contact);

    console.log('Contact Added')



  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }




});

// @route     PUT api/contacts/:id
// @desc      Update a contact
// @access    Pivate
router.put('/:id', auth, async (req, res) => {

  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) {
      return res.json({ msg: 'Contact Not Found' });
    }

    // Make sure user owns a contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });

    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact)
    console.log('Contact Updated')

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/contacs/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'User Not Found' })
    };

    // Make sure user ownes contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contacts.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Removed' })
    console.log('Contact deleted')


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
});


module.exports = router;