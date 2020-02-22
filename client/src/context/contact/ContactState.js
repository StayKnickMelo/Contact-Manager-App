import React, { useReducer} from 'react';
import ContactContext from './contactContext';
import conactReducer from './contacReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import {
  ADD_CONTACT,
  SET_CURRENT,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  RESET_DELETED,
  CONTACT_ERROR,
  CLEAR_ERRORS,
  LOAD_CONTACTS,
  CLEAR_CONTACTS

} from '../types';



const ContactState = (props) => {

  const initialState = {
    contacts: null,
    current: null,
    isDeleted: false,
    filtered: null,
    error: null

  }

  const [state, dispatch] = useReducer(conactReducer, initialState);


  // Load Contacts

  const loadContacts = async () => {

    // if (localStorage.getItem('token')) {
    //   setAuthToken(localStorage.getItem('token'))
    // }

    try {
      const res = await axios.get('/api/contacts/');

      dispatch({
        type: LOAD_CONTACTS,
        payload: res.data
      })


    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response

      })

    }

  }

  // Add Contact
  const addContact = async (contact) => {

    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'))
    }

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.post('api/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })

      

    } catch (err) {

      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      })
      
    }

  }

  // Delete Contact
  const deleteContact = async (id) => {

    try {
      await axios.delete(`api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })

      setTimeout(() => {
        dispatch({
          type: RESET_DELETED
        })
      })

    } catch (err) {

      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      });

    }
  }

  // Set Current Contact
  const setCurrent = (contact) => {

    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  // Clear Current 
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  // Update Contact
  const updateContact = async (contact) => {

    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'))
    }

    const id = contact._id

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      await axios.put(`api/contacts/${id}`, contact, config);

      dispatch({
        type: UPDATE_CONTACT,
        payload: contact
      });

      

    } catch (err) {

      dispatch({
        CONTACT_ERROR,
        payload: err.response.data.msg
      })

    }


  }

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });

  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  // Clear Contacts
  const clearContacts = () => {

    dispatch({
      type: CLEAR_CONTACTS
    })

  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        isDeleted: state.isDeleted,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearErrors,
        loadContacts,
        clearContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  )

}

export default ContactState;