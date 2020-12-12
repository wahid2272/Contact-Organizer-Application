import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import { v4 as uuidv4 } from 'uuid';

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
      },
      {
        id: 2,
        name: 'Yamid ashraf',
        email: 'yamid@gmail.com',
        phone: '11111111'
      }
    ],
    current: null,
    filtered: null
  }
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact (in ContactForm Js)
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact})
  };

  // Delete Contact (in ContactForm Js)
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  };

  // Edit Contact- Will set Current State (in ContactForm Js)
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  };

  // Update Contact- Will Update Current State (in ContactForm Js)
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  };

  // Filter Contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  };

  // Clear Filter- Will clear the filter section
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER})
  };
  
  return (
    <ContactContext.Provider
    value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      addContact,
      setCurrent,
      clearCurrent,
      deleteContact,
      updateContact,
      filterContacts,
      clearFilter
    }}>
      { props.children }
    </ContactContext.Provider>
  )
};

export default ContactState;