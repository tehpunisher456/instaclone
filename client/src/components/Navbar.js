import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css';

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

 

  const renderList = () => {
    if (state) {
      return [
        <div>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/" className="navbar-link-color"> All Posts</Link></li>
          <li><Link to="/profile" className="navbar-link-color">Profile</Link></li>
          <li><Link to="/create" className="navbar-link-color">Create Post</Link></li>
          <li><Link to="/myfollowingpost" className="navbar-link-color">My Timeline</Link></li>
          <li><Link to="/checkout" className="navbar-link-color">Checkout</Link></li>
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
        </ul>

        <ul className="sidenav" id="mobile-demo">
        <li><Link to="/" className="navbar-link-color"> All Posts</Link></li>
          <li><Link to="/profile" className="navbar-link-color">Profile</Link></li>
          <li><Link to="/create" className="navbar-link-color">Create Post</Link></li>
          <li><Link to="/myfollowingpost" className="navbar-link-color">My Timeline</Link></li>
          <li><Link to="/checkout" className="navbar-link-color">Checkout</Link></li>
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
        </ul>
</div>

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
        <Link to={state ? "/myfollowingpost" : "/signin"} className="brand-logo left">Insta $ell</Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger left" ><i className="material-icons icon-white">menu</i></a>

        <ul id="nav-mobile" className="right">
          {renderList()}

        </ul>
      </div>
    </nav>





  )
}


export default NavBar