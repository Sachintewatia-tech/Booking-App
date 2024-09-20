import { useContext } from "react";
import "./navbar.css"
import {Link} from 'react-router-dom';
import { AuthContext } from "../../AuthContext";
import {faUser,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const {loading,error,user} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'} style={{'color':'inherit','textDecoration':'none'}}>
          <span className="logo">Hotel Booking</span>
        </Link>

        { user ? <button style={{textTransform:'capitalize'}}> <FontAwesomeIcon icon={faUser} /> {user.userName}</button>:  <div className="navItems">
          <button className="navButton">Register</button>
          <Link to={'/login'} style={{'color':'inherit','textDecoration':'none'}}>
            <button className="navButton">Login</button>
          </Link>
        </div>}

      </div>
    </div>
  )
}

export default Navbar