import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";


function Form({route, method}) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            // Continuously wait for post request
            const res = await api.post(route, { username, password });

            // If we"re logging in, set the tokens
            if (method === "login") {
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);

                navigate("/");
            } else {
                // Register case: navigate to the login page
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="form-container">
            <h1>{name}</h1>

            <input 
                className="form-input"
                type="text"
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            <input 
                className="form-input"
                type="password"
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
            />
            
            <button className="form-button" type="submit">{ name }</button>
        </form>
    );
}

export default Form;
