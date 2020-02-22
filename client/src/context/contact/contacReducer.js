import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  RESET_DELETED,
  CONTACT_ERROR,
  CLEAR_ERRORS,
  LOAD_CONTACTS,
  CLEAR_CONTACTS

} from '../types';



const contactReducer = (state, action)=>{
  switch(action.type){
    case LOAD_CONTACTS:
      return{
        ...state,
        contacts:  action.payload,
        loading: false
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact=>{
          return contact._id !== action.payload
        }),
        // //////////
        isDeleted: true,
        loading: false
      }
    case RESET_DELETED:
      return{
        ...state,
        isDeleted: false
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact=>{
          return contact._id === action.payload._id ?  action.payload : contact
        }),
        loading: false
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact=>{
          const regEx = new RegExp(action.payload, 'gi');
          return contact.name.match(regEx) || contact.email.match(regEx)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case CLEAR_CONTACTS:
      return{
        ...state,
        contacts: null
      }

    default:
      return state
  }

}

export default contactReducer;