import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// Context
import ContactContext from '../../context/contact/contactContext';

// Components
import ContactItem from './ContactItem';
import Search from './Search';
import Spinner from '../layout/Spinner';

const Contacts = () => {

  const contactContext = useContext(ContactContext);

  const { contacts, filtered, loadContacts, loading } = contactContext;

  useEffect(() => {
    loadContacts();

    // eslint-disable-next-line
  },[]);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4 style={{color: '#fff', textAlign: 'center', fontSize: '1.5rem'}}>Contact list is empty...</h4>
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          <Search />
          {filtered ? filtered.map(contact => (
            <CSSTransition classNames='item' key={contact._id} timeout={1000}>
              <ContactItem contact={contact} />
            </CSSTransition>
          )) : contacts.map(contact => (
            <CSSTransition classNames='item' key={contact._id} timeout={1000} >
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>) :
        <Spinner />
      }
    </Fragment>
  )
}

export default Contacts


// return (
//   <Fragment>

//     <TransitionGroup>
//       <Search />
//       {filtered ? filtered.map(contact => (
//         <CSSTransition classNames='item' key={contact._id} timeout={1000}>
//           <ContactItem contact={contact} />
//         </CSSTransition>
//       )) : contacts.map(contact => (
//         <CSSTransition classNames='item' key={contact._id} timeout={1000} >
//           <ContactItem contact={contact} />
//         </CSSTransition>
//       ))}
//     </TransitionGroup>
//   </Fragment>
// )
