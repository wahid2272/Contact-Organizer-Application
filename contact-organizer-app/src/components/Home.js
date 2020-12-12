import React from 'react';
import Contacts from './contacts/Contacts';
import ContactForm from './contacts/ContactForm';
import ContactSearch from './contacts/ContactSearch';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactSearch />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;