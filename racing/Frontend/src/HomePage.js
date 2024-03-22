import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';
import Navigation from './components/Navigation';

// Functional component representing the homepage of the application.
function HomePage() {
  // State to track if the user is logged in.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to track if the create account form should be shown.
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  // Function to update state when a user logs in successfully.
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to hide the create account form upon successful account creation.
  const handleAccountCreated = () => {
    setShowCreateAccount(false);
  };

  // Function to toggle the visibility of the create account form.
  const toggleCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  // Function to decide which form to render based on the state.
  const renderForm = () => {
    if (showCreateAccount) {
      return <CreateAccountForm onAccountCreated={handleAccountCreated} />;
    } else {
      return <LoginForm onLogin={handleLogin} />;
    }
  };

  // Effect hook to check for a stored login token on component mount, indicating the user is logged in.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user logout, removing the token from storage and updating state.
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };  

  // The rendered UI of the component.
  return (
    <div className="App">
      <header className="App-header">
        {/* Conditional rendering based on the login state. */}
        {!isLoggedIn ? (
          <>
            {renderForm()} {/* Render either the login or create account form based on state. */}
            <button onClick={toggleCreateAccount}>
              {/* Button text changes based on whether the create account form is visible. */}
              {showCreateAccount ? 'Back to Login' : 'Create Account'}
            </button>
          </>
        ) : (
          // If logged in, render the navigation component.
          <Navigation onBack2={handleLogin} onLogout={handleLogout}/>
        )}
      </header>
    </div>
  );
}

export default HomePage;

