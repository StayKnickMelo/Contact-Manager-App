import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

// Context
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';


const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logOut, user } = authContext;

  const contactContext = useContext(ContactContext);
  const {clearContacts} = contactContext

  const onClick = () => {
    logOut();
    clearContacts();
  }

  const userLinks = (
    <Fragment>
      {user && <li>Hello <span style={{color: 'springgreen'}}>{user.name}</span> </li>}
        <li>
        <Link onClick={onClick} to="/login"> <i className="fas fa-sign-out-alt"></i> Log Out</Link>
        </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
    
  )
  return (
    <nav className='navbar'>
      <Link to='/register'><h2 style={{ color: '#fff' }}> <i className={icon}></i> {title}</h2></Link>
      <ul className='nav-links'>
        {isAuthenticated ? userLinks : guestLinks}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Manager',
  icon: 'fas fa-address-book'
}

export default Navbar
