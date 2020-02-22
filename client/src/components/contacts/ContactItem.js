import React, {useContext} from 'react';
import PropTypes from 'prop-types';

// Context
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({ contact }) => {

  const contactContext = useContext(ContactContext);

  const {deleteContact, setCurrent, clearCurrent} = contactContext;

  const { name, email, phone, type, _id } = contact;


  return (
    <div className='card bg-light'>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><h2>{name}</h2> <span className={ type === 'professional' ? ' badge badge-success': 'badge badge-primary'}>{type.charAt(0).toUpperCase().concat(type.slice(1))}</span></div>
      <ul className='list'>
        {email && (<li className='py-1'>
          <i className="fas fa-envelope"></i> {email}
        </li>)}
        {phone && (
          <li className='py-1'>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
     <div>
        <button onClick={() => setCurrent(contact)} className='btn btn-dark btn-sm'>Edit</button>
       <button onClick={()=> {
          deleteContact(_id);
          clearCurrent();
      }
      } className='btn btn-danger btn-sm'>Delete</button>
     </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
