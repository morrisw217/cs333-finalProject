import React, { useState } from 'react';

/**
 * LoginForm component for handling user login.
 * @param {Function} onLogin - A callback function that is called upon successful login.
 */
function LoginForm({ onLogin }) {
  // State hooks for managing form inputs and loading state.
  const [username, setUsername] = useState(''); // Tracks the username input.
  const [password, setPassword] = useState(''); // Tracks the password input.
  const [loading, setLoading] = useState(false); // Tracks the loading state, e.g., during form submission.

  /**
   * Updates the username state based on user input.
   * @param {Event} e - The event object from the username input field.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Updates the password state based on user input.
   * @param {Event} e - The event object from the password input field.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handles the login form submission.
   * @param {Event} e - The event object from the form submission.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    setLoading(true); // Sets loading state to true, indicating the start of login process.

    try {
      // Attempts to login the user with provided credentials.
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Sends username and password as JSON payload.
      });

      if (response.ok) {
        const data = await response.json(); // Parses the JSON response.
        localStorage.setItem('token', data.token); // Stores the received token in local storage.
        onLogin(); // Calls the onLogin callback indicating successful login.
      } else {
        alert('Login failed.'); // Alerts the user if login failed.
      }
    } catch (error) {
      alert('An error occurred. Please try again.'); // Alerts the user on network or server error.
    } finally {
      setLoading(false); // Resets loading state regardless of login outcome.
    }
  };

  // Renders the login form.
  return (
    <form className="form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin} disabled={loading} id='loginButton'>
        {loading ? 'Logging in...' : 'Login'} {/* Displays 'Logging in...' text when in loading state. */}
      </button>
    </form>
  );
}

export default LoginForm;
