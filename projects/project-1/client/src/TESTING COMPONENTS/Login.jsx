import React from 'react'
import './Login.css'
function Login({setUserToken}) {
  return (
    <div className='login-wrapper'>
      <h1>Please Log in</h1>
    <form>
      <label><p>Username</p>
      <input type='text' />
      </label>
      <label><p>Password</p>
      <input type='password' />
      </label>
      <div>
        <button type = "submit">Submit</button>
      </div>
    </form>
    </div>
  )
}

export default Login
