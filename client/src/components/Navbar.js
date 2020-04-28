import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link to="/" className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Signin">Signin</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;