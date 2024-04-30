import "./register.css"
import { useState } from "react"


const Register = ({closeLogin}) => {
  
  const [loadSignIn, setLoadSignIn] = useState(false);
  return (
    <>
      {loadSignIn ? <>
        <div className="register-container">
          <form action="" className="register-form">
            <a onClick={closeLogin} className="register-close-btn">X</a>
            <h1 className="register-logo">Sign-in</h1>
            
            <label htmlFor="" className="register-label">E-mail</label>
            <input type="email" className="register-input" placeholder="E-mail Address" />

            <label htmlFor="" className="register-label">Password</label>
            <input type="password" className="register-input" placeholder="Password" />

            <button className="register-btn" onClick={closeLogin}>Login</button>
            <a onClick={() => {setLoadSignIn(!loadSignIn) }} className="signin-asker"> Create new Account</a>
          </form>
        </div>
      </>:<>
        <div className="register-container">
          <form action="" className="register-form">
            <a onClick={closeLogin} className="register-close-btn">X</a>
            <h1 className="register-logo">Register</h1>

            <label htmlFor="" className="register-label">First Name</label>
            <input type="text" className="register-input" placeholder="First Name" />

            <label htmlFor="" className="register-label">Last Name</label>
            <input type="text" className="register-input" placeholder="Last Name" />

            <label htmlFor="" className="register-label">E-mail</label>
            <input type="email" className="register-input" placeholder="E-mail Address" />

            <label htmlFor="" className="register-label">Password</label>
            <input type="password" className="register-input" placeholder="Password" />

            <label htmlFor="" className="register-label">Confirm Password</label>
            <input type="password" className="register-input" placeholder="Confirm Password" />

            <label htmlFor="" className="register-label">Current Residing Town</label>
            <input type="text" className="register-input" placeholder="Current Town" />

            <label htmlFor="" className="register-label">Interests</label>
            <input type="text" className="register-input" placeholder="Interests space separated" />
            <button className="register-btn" onClick={closeLogin}>Create Account</button>
            <a onClick={() => {setLoadSignIn(true) }} className="signin-asker"> Already a member? Sign in</a>
          </form>
        </div>
      </> 
      }
    </>
  )
}

export default Register