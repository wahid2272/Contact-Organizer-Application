import React, { useContext, useEffect } from 'react';
import Contacts from './contacts/Contacts';
import ContactForm from './contacts/ContactForm';
import ContactSearch from './contacts/ContactSearch';
import AuthContext from '../services/authentication/AuthenticationContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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