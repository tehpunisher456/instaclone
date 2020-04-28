import React from "react";
import {Link } from "react-router-dom"

const Navbar = () => {
  return(
  <div>

{/* <ul id="dropdown1" class="dropdown-content">
  <li><a href="/profile">Profile</a></li>
  <li><a href="#!">two</a></li>
  <li class="divider"></li>
  <li><a href="#!">three</a></li>
</ul> */}
<nav>
  <div className="nav-wrapper">
    <Link to="#!" class="brand-logo">Logo</Link>
    <ul id="nav-mobile" className="right">
    <li><Link to="/Profile">Profile</Link></li>
    <li><Link to="/Login">Login</Link></li>
    <li><Link to="/Signup">Signup</Link></li> 
    <li><Link to="/create">Create Post</Link></li> 
    </ul>
  </div>
</nav>

</div>
)
}
export default Navbar;