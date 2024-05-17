import "./register.css";
import { useState } from "react";
import { useRegisterUserMutation, useLoginUserMutation } from '../../Redux/userApiSlice';

const Register = ({ closeLogin }) => {
  const [loadSignIn, setLoadSignIn] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      await registerUser(userData).unwrap();
      closeLogin();
    } catch (err) {
      setError(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await loginUser({ email, password }).unwrap();
      closeLogin();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {loadSignIn ? (
        <div className="register-container">
          <form onSubmit={handleLogin} className="register-form">
            <button type="button" onClick={closeLogin} className="register-close-btn">X</button>
            <h1 className="register-logo">Sign-in</h1>

            <label htmlFor="email" className="register-label">E-mail</label>
            <input type="email" name="email" className="register-input" placeholder="E-mail Address" required />

            <label htmlFor="password" className="register-label">Password</label>
            <input type="password" name="password" className="register-input" placeholder="Password" required />

            <button type="submit" className="register-btn">Login</button>
            <button type="button" onClick={() => setLoadSignIn(false)} className="signin-asker">Create new Account</button>

            {error && <div className="error-message">{error.data || 'An error occurred during login.'}</div>}
          </form>
        </div>
      ) : (
        <div className="register-container">
          <form onSubmit={handleRegister} className="register-form">
            <button type="button" onClick={closeLogin} className="register-close-btn">X</button>
            <h1 className="register-logo">Register</h1>

            <label htmlFor="firstName" className="register-label">First Name</label>
            <input type="text" name="firstName" className="register-input" placeholder="First Name" required />

            <label htmlFor="lastName" className="register-label">Last Name</label>
            <input type="text" name="lastName" className="register-input" placeholder="Last Name" required />

            <label htmlFor="email" className="register-label">E-mail</label>
            <input type="email" name="email" className="register-input" placeholder="E-mail Address" required />

            <label htmlFor="password" className="register-label">Password</label>
            <input type="password" name="password" className="register-input" placeholder="Password" required />

            <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="register-input" placeholder="Confirm Password" required />

            <label htmlFor="town" className="register-label">Current Residing Town</label>
            <input type="text" name="town" className="register-input" placeholder="Current Town" required />

            <label htmlFor="interests" className="register-label">Interests</label>
            <input type="text" name="interests" className="register-input" placeholder="Interests space separated" required />

            <button type="submit" className="register-btn">Create Account</button>
            <button type="button" onClick={() => setLoadSignIn(true)} className="signin-asker">Already a member? Sign in</button>

            {error && <div className="error-message">{error.data || 'An error occurred during registration.'}</div>}
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
