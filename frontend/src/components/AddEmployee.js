import React, { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const AddEmployee = () => {
    const [newEmployee, setNewEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: 0
    });
    const [error, setError] = useState('');
    const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/emp/employees/add', newEmployee);
            if (response.status === 201) {
                // Clear the form after successful addition
                setNewEmployee({
                    first_name: '',
                    last_name: '',
                    email: '',
                    gender: '',
                    salary: 0
                });
                setSignupSuccessMessage('Employee added successfully!');
                setError('');
            }
            setTimeout(() => {
                setSignupSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding employee:', error);
            setError(error.response.data.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label} >First Name:
                    <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleInputChange}/>
                </label>
                <label style={styles.label}>Last Name:
                    <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleInputChange}/>
                </label>
                <label style={styles.label}>Email:
                    <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange}/>
                </label>
                <label style={styles.label}> Gender:
                    <select
                        name="gender"
                        value={newEmployee.gender}
                        onChange={handleInputChange}>

                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </label>
                <label style={styles.label}>Salary:
                    <input type="number" name="salary" value={newEmployee.salary} onChange={handleInputChange}/>
                </label>
                <button type="submit">Save</button>
                <Link to="/employees"><button>Home</button></Link>

                {signupSuccessMessage && <p>{signupSuccessMessage}</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

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

export default AddEmployee;


