import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {

    // When a user is signed in
    if (state) {
      return [
        <li> <Link to="/"> Timeline </Link> </li>,
        <li> <Link to="/profile">Profile</Link></li>,
        <li> <Link to="/create">Create Post</Link> </li>,
        <li>
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}>
            Logout
          </button>
        </li>

      ]
    } 
    // When User is Not signed in
    else {
      return [
        <li><Link to="/signup">Signup</Link> </li>,
        <li><Link to="/signin">Signin</Link> </li>
      ]
    }
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo left">
            {" "}
            BTS UwU
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
