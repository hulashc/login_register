import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === '' && errors.password === '') {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data === 'Success') {
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded shadow-lg" style={{ width: '350px' }}>
        <h2 className="text-center mb-4">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleInput}
              className={`form-control ${errors.email && 'is-invalid'}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleInput}
              className={`form-control ${errors.password && 'is-invalid'}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
          <p className="mt-3 text-center">
            By logging in, you agree to our <Link to="/terms">terms and policies</Link>.
          </p>
          <p className="text-center">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
