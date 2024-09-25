import { useContext } from "react";
import "./navbar.css"
import {Link} from 'react-router-dom';
import { AuthContext } from "../../AuthContext";
import {faUser,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const {user,dispatch} = useContext(AuthContext);
  const logoutUser = ()=>{
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'} style={{'color':'inherit','textDecoration':'none'}}>
          <span className="logo">Hotel Booking</span>
        </Link>

        { user ?<div> <button style={{textTransform:'capitalize'}}> <FontAwesomeIcon icon={faUser} /> {user.userName}</button> 
        <button onClick={logoutUser}>Logout</button> </div>: 
         <div className="navItems">
          <Link to={'/register'} style={{'color':'inherit','textDecoration':'none'}}>
            <button className="navButton">Register</button>
          </Link>
          <Link to={'/login'} style={{'color':'inherit','textDecoration':'none'}}>
            <button className="navButton">Login</button>
          </Link>
        </div>}

      </div>
    </div>
  )
}

export default Navbar