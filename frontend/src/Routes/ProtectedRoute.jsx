import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const ProtectedRoute = ({ children }) => {
    const token=localStorage.getItem("auth");
    const navigate=useNavigate()
    const location=useLocation()
    useEffect(()=>{
        if(!token){
            navigate('/login',{state:{from:location.pathname}})
        }
    },[token, location, navigate])

    return token?<Outlet/>:<p>Loading....</p>
}

export default ProtectedRoute;
