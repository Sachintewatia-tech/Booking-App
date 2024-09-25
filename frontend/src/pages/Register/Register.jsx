import { useContext, useState } from 'react';
import './Register.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => { 
  const [error,setError] = useState(null);
    const [credentials, setCredentials] = useState({
        userName: undefined,
        password: undefined,
        email: undefined
    });
        
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://booking-app-backend-tdb8.onrender.com/auth/register`, credentials);
            alert('User Registered successfully')
            navigate('/login');
        } catch (err) {            
          if (err.response && err.response.data && err.response.data.message) {
              setError(err.response.data.message);  
          } else {
              setError("An error occurred. Please try again.");  
          }
      }

    }

    return (
        <div className="register-form-container">
            <div className="register-form">
                <h2>Register User</h2>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" id="userName" required onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>email</label>
                    <input type="mail" id="email" required onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" id="password" required onChange={handleChange} />
                </div>

                {/* Display error message */}
                {error && <div>
                  <span className="error-message">{error}</span>
                  <Link className="login-link" to={'/login'}>Please login</Link>
                </div>}

                <button onClick={handleClick} className="lbutton">Register</button>

                <Link className="login-link" to={'/login'}>Already have an account?</Link>
            </div>

        </div>
    );
}

export default Register;
