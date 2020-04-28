import React from "react"

const Login = () => {
  return (
    <div class="card">
      <h2>Instagram</h2>
      <input
      type = "text"
      placeholder = "email"
      />
      <input
      type = "text"
      placeholder = "password"
      />
      <button className = "btn waves-effect waves-light">
        <i className = "materialize-icons right">Send</i>
      </button>
  </div>
  )
}
export default Login