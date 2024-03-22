// Import the necessary React library and the useState hook
import React, { useState } from 'react';

/**
 * Functional component for creating a new account.
 * @param {Function} onAccountCreated - A callback function that is called once the account creation is successful.
 */
function CreateAccountForm({ onAccountCreated }) {
  // State hooks for managing the username, password, and loading status.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler for changing the username in the component's state
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handler for changing the password in the component's state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handler for the account creation process.
   * Prevents the default form submission behavior, sets loading state,
   * sends a POST request with the username and password, and handles the response.
   */
  const handleCreateAccount = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading state to true to indicate process start
    try {
      // Send a POST request to the server with the username and password
      const response = await fetch('http://localhost:3001/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If account creation is successful, show an alert and call the onAccountCreated callback
        alert('Account created successfully. Please login.');
        onAccountCreated();
      } else {
        // If the server responds with an error, alert the user
        alert('Failed to create account.');
      }
    } catch (error) {
      // If there is an error in the request, alert the user
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset the loading state regardless of the outcome
    }
  };

  // The form UI for account creation, including input fields for username and password and a create account button.
  return (
    <form className="form">
      <p>Enter New Username</p>
      <input type="text" placeholder="New Username" value={username} onChange={handleUsernameChange} />
      <p>Enter New Password</p>
      <input type="password" placeholder="New Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleCreateAccount} disabled={loading}>Create Account</button>
    </form>
  );
}

// Export the CreateAccountForm component for use in other parts of the application.
export default CreateAccountForm;

