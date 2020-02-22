import React, {useEffect, useContext} from 'react';

// components
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

// context
import AuthContext from '../../context/auth/authContext';

const Home = () => {

  const authContext = useContext(AuthContext);

  const {loadUser} = authContext

  useEffect(()=>{
    loadUser()
    // eslint-disable-next-line
  },[]);


  return (
    <div className="grid-2">
      <div>
        <ContactForm/>
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
      <Contacts/>
      </div>
    </div>
  )
}

export default Home
