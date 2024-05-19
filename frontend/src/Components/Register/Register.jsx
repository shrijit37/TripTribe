import "./register.css";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import {useLoginMutation,useRegisterMutation} from "../../Redux/userApiSlice"


const Register = ({ closeLogin }) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [userInterest,setUserInterest] = useState("")
  const [userAddress,setUserAddress] = useState("")
  const [fname,setFname] = useState("")
  const [lname,setLname] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

   const dispatch = useDispatch();


  const userInfo = useSelector(state=>state.auth)

  const [loadSignIn, setLoadSignIn] = useState(false);
  
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();  

    if(password !== confirmPassword){
      console.log("password did not match")
      setError("Password did not match")
    }
    else{ 
      try {
        setEmail(email.toLowerCase());
        const res = await register({fname,lname,email,password,userInterest,userAddress}).unwrap();
        if (res._id) {
          dispatch({...res})
          closeLogin();
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(err);
        console.error('Registration Error:', err);
      }
    }
   
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res)
      dispatch(setCredentials({...res}));
      closeLogin();
    } catch (err) {
      setError(err);
      console.error('Login Error:', err);
    }
  };

  return (
    <>
      {loadSignIn ? (
        <div className="register-container">
          <form onSubmit={handleLogin} className="register-form">
            <h1 className="register-logo">Sign-in</h1>

            <label htmlFor="email" className="register-label">E-mail</label>
            <input type="email" name="email" className="register-input" placeholder="E-mail Address" required onChange={e=>setEmail(e.target.value)}/>

            <label htmlFor="password" className="register-label">Password</label>
            <input type="password" name="password" className="register-input" placeholder="Password" required onChange={e=>setPassword(e.target.value)}/>

            <button type="submit" className="register-btn">Login</button>
            <button type="button" onClick={() => setLoadSignIn(false)} className="signin-asker">Create new Account</button>

            {error && <div className="error-message">{error.message || 'An error occurred during login.'}</div>}
          </form>
        </div>
      ) : (
        <div className="register-container">
          <form onSubmit={handleRegister} className="register-form">
            <h1 className="register-logo">Register</h1>

            <label htmlFor="firstName" className="register-label" >First Name</label>
            <input type="text" name="fname" className="register-input" placeholder="First Name" required onChange={e=>setFname(e.target.value)}/>

            <label htmlFor="lastName" className="register-label ">Last Name</label>
            <input type="text" name="lname" className="register-input" placeholder="Last Name" required onChange={e=>setLname(e.target.value)}/>

            <label htmlFor="email" className="register-label">E-mail</label>
            <input type="email" name="email" className="register-input" placeholder="E-mail Address" required onChange={e=>setEmail(e.target.value)}/>

            <label htmlFor="password" className="register-label">Password</label>
            <input type="password" name="password" className="register-input" placeholder="Password" required onChange={e=>setPassword(e.target.value)}/>

            <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="register-input" placeholder="Confirm Password" required onChange={e=>setConfirmPassword(e.target.value)}/>

            <label htmlFor="town" className="register-label">Current Residing Town</label>
            <input type="text" name="town" className="register-input" placeholder="Current Town" required onChange={e=>setUserAddress(e.target.value)}/>

            <label htmlFor="interests" className="register-label">Interests</label>
            <input type="text" name="interests" className="register-input" placeholder="Interests space separated" required onChange={e=>setUserInterest(e.target.value)}/>

            <button type="submit" className="register-btn">Create Account</button>
            <button type="button" onClick={() => setLoadSignIn(true)} className="signin-asker">Already a member? Sign in</button>

            {error && <div className="error-message">{error.message || 'An error occurred during registration.'}</div>}
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
