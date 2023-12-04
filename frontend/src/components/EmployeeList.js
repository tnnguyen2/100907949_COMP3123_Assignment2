import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/emp/employees')
            .then(response => {
                if (response.status === 200) {
                    setEmployees(response.data);
                } else {
                    console.error('Error fetching employees');
                }
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/emp/employees/delete/${id}`);
            if (response.status === 200) {
                setEmployees(employees.filter(emp => emp._id !== id));
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };


    return (
        <div style={styles.container}>
            <h2>Employee List</h2>
            <Link to="/employees/add" style={styles.addEmployeeButton}>Add Employee</Link>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>Last Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee._id}>
                        <td style={styles.td}>{employee.first_name}</td>
                        <td style={styles.td}>{employee.last_name}</td>
                        <td style={styles.td}>{employee.email}</td>
                        <td style={styles.td}>
                            <div style={styles.actionButtonContainer}>
                                <Link to={`/employees/${employee._id}`}>
                                    <button style={styles.actionButton}>View</button>
                                </Link>
                                <Link to={`/employees/update/${employee._id}`}>
                                    <button style={styles.actionButton}>Update</button>
                                </Link>
                                <button onClick={() => handleDelete(employee._id)} style={styles.actionButton}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/" style={styles.logoutButton}>Logout</Link>
        </div>
    );
};
const styles = {
    container: {
        width: '75%',
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
    addEmployeeButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
    },
    td: {
        border: '1px solid #ccc',
        padding: '8px',
    },
    actionButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    actionButton: {
        margin: '0 5px',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    logoutButton: {
        marginTop: '150px',
        padding: '10px 20px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
    },
};

export default EmployeeList;

