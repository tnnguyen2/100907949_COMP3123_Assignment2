import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';


const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: 0
    });
    const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

    useEffect(() => {
         axios.get(`http://localhost:3001/api/v1/emp/employees/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    setEmployee(data);
                } else {
                    console.error('Error fetching employee details');
                }

            })
            .catch (error => {
                console.error('Error fetching employee details:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/api/v1/emp/employees/update/${id}`, employee);
            if (response.status === 200) {
                console.log('Employee updated successfully!');
                setSignupSuccessMessage('Employee updated successfully!')
            } else {
                console.error('Error updating employee');
            }setTimeout(() => {
                setSignupSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Update Employee</h2>
            <form style={styles.form} onSubmit={handleUpdate}>
                <label style={styles.label}>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.label}>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.label}>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={styles.label}>
                    Gender:
                    <select
                        name="gender"
                        value={employee.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label style={styles.label}>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" style={styles.button}>Update Employee</button>
                <Link to="/employees"><button style={styles.button}>Home</button></Link>
                {signupSuccessMessage && <p style={styles.successMessage}>{signupSuccessMessage}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: '50%',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        alignItems : 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        margin: '10px auto',
        display: 'flex',


    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
        marginBottom: '15px',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        margin: '5px auto',
        width: '50%',
    },
    successMessage: {
        color: 'green',
        marginTop: '10px',
    },
};

export default UpdateEmployee;
