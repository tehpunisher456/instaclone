import React, { useState } from "react"
import {Link} from "react-router-dom"


const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
const PostData = ()=> {
  fetch("/signup", {
    method: "post",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name:"",
      password:"",
      email: ""
    })
  }).then(res => res.json())
  .then(data=>{
    console.log(data)
  })
}

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className = "brand-logo">Instagram</h2>
        <input type="text" placeholder="name" value = {name} onChange = {(e) => setName(e.target.value)}/>
        <input type="text" placeholder="email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={()=>PostData()}>
          Sign Up
        </button>
        <h5>
          <Link to = "/Signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  )
}
export default Signup