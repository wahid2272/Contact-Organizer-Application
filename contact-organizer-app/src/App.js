import { React, useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";

import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import Profile from "./component/Profile";
import BoardUser from "./component/BoardUser";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark navbar-custom">
        <Link to={"/"} className="navbar-brand navbar-text">
          Contact Organizer
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="navbar-brand navbar-text">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="navbar-brand navbar-text">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="navbar-brand navbar-text">
                {currentUser.userId}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className="navbar-brand navbar-text" onClick={logOut}>
                LogOut
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="navbar-brand navbar-text">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="navbar-brand navbar-text">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
