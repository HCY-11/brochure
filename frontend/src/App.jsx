import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
//import { useState, useEffect } from 'react';

function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />;
}

//function RegisterAndLogout() {
//    // Clear local storage to ensure no lingering access tokens
//    localStorage.clear();
//    return <Register />;
//}

function App() {
    //const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path='/login' element={ <Login /> } />
                <Route path='/logout' element={ <Logout /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
