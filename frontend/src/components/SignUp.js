import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SignUp = ()=> {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/signup', {
                username: username,
                email: email,
                password: password
            });
            if (response.status === 201) {
                setUsername('');
                setEmail('');
                setPassword('');
                setSignupSuccessMessage('User registered successfully!');
                setError('');
            }
            setTimeout(() => {
               navigate('/')
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong');
            }
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    };


    return (
        <div style={styles.container}>
            <h2>Signup</h2>
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
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button onClick={handleSignUp} style={styles.button}>Signup</button>

            {signupSuccessMessage && <p>{signupSuccessMessage}</p>}
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

export default SignUp;