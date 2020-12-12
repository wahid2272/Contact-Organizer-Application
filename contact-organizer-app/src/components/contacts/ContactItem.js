import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const { id, name, email, phone } = contact
  return (
    <div className='card bg-light'>
      <h3 className="text-primary text-left">
        {name}
      </h3>
      <ul className="list">
        {email && (<li>
          <i className="fas fa-envelope-open-text"></i> {email}
        </li>)}
        {phone && (<li>
          <i className="fas fa-phone-alt"></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </p>
    </div>
  );
};

export default ContactItem;