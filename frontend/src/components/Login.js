import React, { useState } from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        username,
        password
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/employees')
        setLoginSuccess('Login successfully');

      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Username or password is incorrect');
    }
  };

    return (
    <div style={styles.container}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username" style={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}  style={styles.button}>Login</button>
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Sign Up Here</Link>
      </p>
      {loginSuccess && <p>{loginSuccess}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f8f8',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '30vh',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    margin : '10px'
  },
  error: {
    color: '#e74c3c',
    marginTop: '10px',
    textAlign: 'center',
  },
};
export default Login;