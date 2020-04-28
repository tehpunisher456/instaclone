import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Please enter a valid email", classes:"#c62828 red darken-3"})
    return
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        userName,
        password,
        email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       if(data.error){
         M.toast({html: data.error})
       }
       else{
         M.toast({html: data.message, classes:"$43a047 green darken-1"})
         history.push('/signin')
       }
      }).catch(err=>{
        console.log(err)
      })
    
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo"> Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={() => PostData()}
        >
          Sign Up
        </button>
        <h5> Already Have an Account? </h5>
        <p>
          <Link to="/Signin">Sign in Here</Link>
        </p>
        
      </div>
    </div>
  );
};
export default Signup;
