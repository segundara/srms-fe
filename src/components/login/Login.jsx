import React, { useState } from "react";
import loginImg from "../../login1.svg";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./style.scss";
import { Alert } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const response = await res;

      if (response.status === 200) {
        localStorage.setItem("userTitle", JSON.stringify(response.data));
        props.history.push("/dashboard");
        console.log(response.status);
      } else {
        console.log(response.status);
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 5000);
    }
  };

  return (
    <div className="base-container">
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={getEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={getPassword}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={login}>
          Login
        </button>
      </div>
      <Alert variant="danger" show={failure} className="mt-3">
        <strong>Please check your email or password!</strong>
      </Alert>
    </div>
  );
};

export default withRouter(Login);
