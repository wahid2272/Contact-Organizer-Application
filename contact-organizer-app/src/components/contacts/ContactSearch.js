import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../services/contactState/ContactContext';

const ContactSearch = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = event => {
    if (text.current.value !== '') {
      filterContacts(event.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Search your contact here...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactSearch;