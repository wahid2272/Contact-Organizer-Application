import { React, useState } from "react";
import axios from "axios";
import { setUserSession } from "../utils/Common";

import "./Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [oading, setLoading] = useState(false);

  const handleLogin = (props) => {
    if (userId.length > 0 && password.length > 0) {
      props.history.push("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userid">User ID</label>
          <input
            type="text"
            name="userid"
            id="userid"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {error && <><small style={{color:'red'}}>{error}</small><br/></>}<br/>
        <button type="submit" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
