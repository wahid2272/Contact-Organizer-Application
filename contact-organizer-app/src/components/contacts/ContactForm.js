import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../services/contactState/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, clearCurrent, current, updateContact } = contactContext;

  useEffect(() => {
    if(current !== null) {
      setContact(current);
    }
    else {
      setContact({
        name: '',
        email: '',
        phone: ''
      })
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { name, email, phone } = contact;

  const onChange = (event) => setContact({ ...contact, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input 
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input 
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input 
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <div>
        <input 
        type="submit" 
        value={current ? 'Update Contact' : 'Add Contact'} 
        className="btn btn-primary btn-block"/>
      </div>
      {current &&  (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Cancel Update
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;