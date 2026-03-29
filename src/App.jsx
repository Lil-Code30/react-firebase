import "./App.css";
import Todos from "./pages/Todos";
import React, { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="auth-form">
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div className="auth-toggle" onClick={() => setShowLogin(false)}>
        Don't have an account? Sign up
      </div>
    </div>
  );

  const showSignupForm = () => (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form className="auth-form">
        <label htmlFor="signup-email">Email:</label>
        <input type="email" placeholder="Email" id="signup-email" />
        <label htmlFor="signup-password">Password:</label>
        <input type="password" id="signup-password" placeholder="Password" />
        <label htmlFor="signup-confirm">Confirm Password:</label>
        <input
          type="password"
          id="signup-confirm"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-toggle" onClick={() => setShowLogin(true)}>
        Already have an account? Login
      </div>
    </div>
  );

  return (
    <>
      <h1>Firebase + React</h1>
      {showLogin ? showLoginForm() : showSignupForm()}
      <Todos />
    </>
  );
}

export default App;
