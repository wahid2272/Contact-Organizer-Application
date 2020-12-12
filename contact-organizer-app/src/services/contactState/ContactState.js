import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'hamid ashraf',
        email: 'hamid@gmail.com',
        phone: '11111111'
      }
    ]
  }
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider
    value={{
      contacts: state.contacts
    }}>
      { props.children }
    </ContactContext.Provider>
  )
};

export default ContactState;