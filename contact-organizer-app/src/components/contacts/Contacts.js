import React, { useContext, useEffect } from 'react';
import ContactItem from './ContactItem'
import ContactContext from '../../services/contactState/ContactContext'

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() =>{
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <>
      {filtered !== null
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
    </>
  );
};

export default Contacts;