import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [

        <li><Link to="/"> All Posts</Link></li>,
        <li><Link to="/profile" className="navbar-link-color">Profile</Link></li>,
        <li><Link to="/create" className="navbar-link-color">Create Post</Link></li>,
        <li><Link to="/myfollowingpost" className="navbar-link-color">My Timeline</Link></li>,
        <li><Link to="/checkout" className="navbar-link-color">Checkout</Link></li>,

        <li>
          <button className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}
          >
            Logout
            </button>
        </li>


      ]
    } else {
      return [
        <li><Link to="/signin" className="navbar-link-color">Sign In</Link></li>,
        <li><Link to="/signup" className="navbar-link-color">Sign Up</Link></li>
      ]
    }
  }
  return (
    <nav>

      <div className="nav-wrapper main-background-color">
        <Link to={state ? "/myfollowingpost" : "/signin"} className="brand-logo center">Insta $ell</Link>

        <ul id="nav-mobile" className="right">
          {renderList()}

        </ul>
      </div>
    </nav>
  )
}


export default NavBar