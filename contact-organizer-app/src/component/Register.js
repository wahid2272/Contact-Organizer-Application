import { React, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is reqired!
      </div>
    );
  }
};

const validateUserId = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        UserId must be between 3 and 20 characters.
      </div>
    );
  }
};

const validatePassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Password must be between 8 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUserId = (e) => {
    const userId = e.target.value;
    setUserId(userId);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    if (confirmPassword !== password) {
      return <p>Password does not match</p>;
    }
    setConfirmPassword(confirmPassword);
  };
};

const handleRegister = (e) => {
  e.preventDefault();

  setMessage("");
  setSuccessful(false);

  form.current.validateAll();

  if (checkBtn.current.context._errors.length === 0) {
    AuthService.register(userId, password, confirmPassword).then(
      (res) => {
        setMessage(res.data.message);
        setSuccessful(true);
      },
      (err) => {
        const resMessage =
          (err.res && err.res.data && err.data.message) ||
          err.message ||
          err.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  }
};

return (
  <div className="col-md-12">
    <div className="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <Input
                type="text"
                className="form-control"
                name="userId"
                value={userId}
                onChange={onChangeUserId}
                validations={[required, validateUserId]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, validatePassword]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                validations={[required, validatePassword]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  </div>
);

export default Register;
