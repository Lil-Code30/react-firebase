import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config/firebase";
import "./App.css";
import Todos from "./pages/Todos";
import React, { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showTodos, setShowTodos] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  // handle form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword.trim().length >= 6 && signupPassword === signupConfirm) {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      alert("Signup successful! Please log in.");
      setShowLogin(true);
    } else {
      alert(
        "Passwords must be at least 6 characters and match the confirmation.",
      );
    }
  };

  // hande login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    alert("Login successful!");
    setShowLogin(false);
    setShowTodos(true);
  };

  const showLoginForm = () => (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
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
      <form className="auth-form" onSubmit={handleSignupSubmit}>
        <label htmlFor="signup-email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          id="signup-email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="signup-password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <label htmlFor="signup-confirm">Confirm Password:</label>
        <input
          type="password"
          id="signup-confirm"
          placeholder="Confirm Password"
          value={signupConfirm}
          onChange={(e) => setSignupConfirm(e.target.value)}
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
      {showLogin ? showLoginForm() : showTodos ? <Todos /> : showSignupForm()}
    </>
  );
}

export default App;
