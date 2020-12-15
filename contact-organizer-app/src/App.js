import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Alerts from './components/Alerts';
import Footer from './components/Footer';

import ContactState from './services/contactState/ContactState';
import AuthenticationState from './services/authentication/AuthenticationState';
import AlertState from './services/alert/AlertState';
import setAuthToken from './services/token/setAuthToken';
import PrivateRoute from './services/token/PrivateRouting';
import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthenticationState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className='container'>
                <Alerts/>             
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </>
          </Router>
          <Footer />
        </AlertState>
      </ContactState>
    </AuthenticationState>
    
  );
}

export default App;