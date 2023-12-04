import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const EmployeeInfo = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState({});

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
            .catch(error => {
                console.error('Error fetching employee details:', error);
            });
    }, [id]);

    return (
        <div style={styles.container}>
            <h1>Employee Information</h1>
            {Object.keys(employee).length > 0 ? (
                <div>
                    <p>First Name: {employee.first_name}</p>
                    <p>Last Name: {employee.last_name}</p>
                    <p>Email: {employee.email}</p>
                    <p>Gender: {employee.gender}</p>
                    <p>Salary: {employee.salary}</p>
                </div>

            ) : (
                <p>Loading employee information...</p>
            )}
            <Link to="/employees"><button style={styles.button}>Home</button></Link>
        </div>
    )
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
        backgroundColor: '#007bff',
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
export default EmployeeInfo;