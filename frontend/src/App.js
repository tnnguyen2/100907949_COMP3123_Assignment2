import React, {useState} from 'react';
import EmployeeList from "./components/EmployeeList";
import Login from "./components/Login";
import AddEmployee from "./components/AddEmployee";
import EmployeeInfo from "./components/EmployeeInfo";
import UpdateEmployee from "./components/UpdateEmployee";
import SignUp from "./components/SignUp";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setIsLoggedIn={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    {isLoggedIn ? (
                        <>
                            <Route path="/employees" element={<EmployeeList/>} />
                            <Route path="/employees/add" element={<AddEmployee />}/>
                            <Route path="/employees/:id" element={<EmployeeInfo />}/>
                            <Route path="/employees/update/:id" element={<UpdateEmployee />}/>
                        </>
                    ) : (
                        <Route path="/employees/*" element={<Navigate to="/" />}
                        />


                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;