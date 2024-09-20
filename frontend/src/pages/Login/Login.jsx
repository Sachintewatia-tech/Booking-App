import { useContext, useState } from 'react';
import './Login.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => { 
    const [credentials, setCredentials] = useState({
        userName: undefined,
        password: undefined
    });
    
    const { loading, error, dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`http://localhost:4500/auth/login`, credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/');
        } catch (error) {            
            dispatch({ type: "LOGIN_FALIURE", payload: error.response.data });
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Login</h2>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" id="userName" required onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" id="password" required onChange={handleChange} />
                </div>

                {/* Display error message */}
                {error && <span style={{ color: "red" }}>{error.message}</span>}

                <button disabled={loading} onClick={handleClick} className="lbutton">Login</button>
                
            </div>
        </div>
    );
}

export default Login;
