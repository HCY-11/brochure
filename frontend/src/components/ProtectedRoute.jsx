// Wrapper for protected route
// Need to pass authorization token before route is accessible

import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [ isAuthorized, setIsAuthorized ] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh/", { refresh: refToken });
            
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        // Grab access token
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);

        // Check that token is not expired
        const tokenExpire = decoded.exp;
        const now = Date.now() / 1000;
        if (now > tokenExpire) {
            // If access token expired, wait for it to be refreshed
            await refreshToken();
        } else {
            // Otherwise, we can just authenticate
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
