import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getRandomQuotesByCategory from './quotesAPI';

const CharacterChoice = ({ onLogout }) => {
  const navigate = useNavigate();

  // State to store a single quote
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // Fetch a quote from the motivational category
    getRandomQuotesByCategory('motivational') 
      .then(quote => {
        setQuote(quote); 
        console.log(quote.text)
      })
      .catch(error => console.error('Failed to fetch quote:', error));
  }, []); 

  return (
    <div>
      <header>
        {/** Buttons for navigating to other routes and a logout button. */}
        <div className='navigationButtons'>
          <nav>
            <button onClick={() => navigate('/charactersDisplay')} id='characters'>Characters</button>
            <button onClick={onLogout} id='logout'>Log out</button>
            <button onClick={() => navigate('/characterCreation')} id='newChar'>New Character</button>
          </nav>
        </div>
      </header>
      {/* Display the quote */}
      {quote && (
        <blockquote>
          <h4>"{quote.text}"</h4>
          <footer>— {quote.author}</footer>
        </blockquote>
      )}
    </div>
  );
};

export default CharacterChoice;
