import React, { useState, useContext, useEffect } from 'react';

// Context
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext'


const ContactForm = () => {

  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, clearCurrent, isDeleted, error, clearErrors } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;



  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {

    if(error){
      setAlert(error, 'danger');
      clearErrors()
    }

    if (current) {
      setContact(current);
    }

    if (isDeleted) {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'

      })
    }
    // eslint-disable-next-line
  }, [contactContext, current, error])

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  const onClick = (e) => {


    clearCurrent();

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'

    })


  }

  const onSubmit = (e) => {


    e.preventDefault();

    if (current) {
      // Update
      updateContact(contact);

      // clear current
      clearCurrent()
    } else {



      addContact(contact);


      // addContact(contact);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'

    })

  }



  return (
    <form onSubmit={onSubmit} className='card'>
        <h2 className='text-center'>{current ? 'Update Contact' : 'Add Contact'}</h2>
      <label htmlFor="name">Name</label>
      <input onChange={onChange} value={name} type="text" name="name" />
      <label htmlFor="email">Email</label>
      <input onChange={onChange} value={email} type="email" name='email' />
      <label htmlFor="phone">Phone</label>
      <input onChange={onChange} value={phone} type="text" name='phone' />
      <label htmlFor="type">Personal </label>
      <input onChange={onChange} type="radio" name="type" value='personal' checked={type === 'personal'} />
      <label htmlFor="type"> Professional </label>
      <input onChange={onChange} type="radio" name="type" value="professional" checked={type === 'professional'} />

      <div>
        <input className={current ? 'btn btn-block btn-update' : 'btn btn-block btn-form'} type="submit" value={current ? 'Update Contact' : 'Add Contact'} />

        {current && <button type="button" onClick={onClick} className='btn btn-light btn-block'>Cancel</button>}
      </div>
    </form>
  )
}

export default ContactForm
