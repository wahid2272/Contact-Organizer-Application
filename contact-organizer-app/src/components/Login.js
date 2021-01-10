import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '.././services/alert/AlertContext';
import AuthContext from '.././services/authentication/AuthenticationContext';



const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = event => {
    event.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };
  const image = 'https://source.unsplash.com/700x500/?organizer';

  return (
    <div className="wrapper">
      <div className="hero">
        <div className="hero-content">
            <p>
              Contact Organizer helps you <br></br> to manage information of the <br></br> <strong><span>people that matter to you.</span></strong>
            </p>
          </div>
            <div className={'hero-img'} style={{backgroundImage: `url(${image})`}}/>
      </div>
      <div className='form-container'>
      
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </form>
      </div>
    </div>
  );
};

export default Login;