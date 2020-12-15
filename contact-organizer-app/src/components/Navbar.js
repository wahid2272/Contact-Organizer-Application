import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../services/authentication/AuthenticationContext';
import ContactContext from '../services/contactState/ContactContext';
import logo from './logo.svg';

import Button from '@material-ui/core/Button';

const Navbar = ({ title, icon}) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearContacts } = contactContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
    <Button variant="contained" color="bt-color">
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Button>
    <Button variant="contained">
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Button>
    </>
  );

  return (
    <div className='navbar bg-primary'>
      {/* <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1> */}
      <div className="header-logo">
        <Link to='./'><img src={logo} alt="logo" /></Link>
      </div>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes ={
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'contact organizer',
  icon: 'fas fa-user-plus'
}

export default Navbar;