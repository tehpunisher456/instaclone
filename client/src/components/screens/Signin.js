import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import M from 'materialize-css'

const Signin = () => {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  const PostData = () => {
    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //   M.toast({html: "Please enter a valid email", classes:"#c62828 red darken-3"})
    // return
    // }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
       if(data.error){
         M.toast({html: data.error})
       }
       else{
         M.toast({html: "Sign in successful", classes:"$43a047 green darken-1"})
         history.push('/')
       }
      }).catch(err=>{
        console.log(err)
      })
    
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className = "brand-logo">Sign in Here</h2>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
          <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
        onClick={()=>PostData()}>
          Sign in
        </button>
        <h2>
          <Link to = "/Signup">Need an account?</Link>
        </h2>
      </div>
    </div>
  )
}
export default Signin