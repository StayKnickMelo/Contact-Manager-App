import React, {useContext} from 'react';

// Context
import ContactContext from '../../context/contact/contactContext';

const Search = () => {

  const contactContext = useContext(ContactContext);

  const {filterContacts, clearFilter} = contactContext;

  const onChange = (e)=> {

    if(e.target.value === ''){
      clearFilter()

    }else{
      filterContacts(e.target.value);
    }

  }

  return (
    <div>
      <input className='search-input' onChange={onChange} type="text" placeholder="Search Contacts..."/>
    </div>
  )
}

export default Search
