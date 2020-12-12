import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ContactState from './services/contactState/ContactState'
import './App.css';

function App() {
  return (
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />

            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
}

export default App;
