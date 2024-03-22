import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Functional component to display the characters
function CharactersDisplay() {
    const [characters, setCharacters] = useState([]); // State hook to store characters
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Asynchronous function to fetch character data
        const fetchCharacters = async () => {
            const token = localStorage.getItem('token'); // Retrieve the authentication token
            try {
                // Fetch the list of character IDs from the server
                const response = await fetch('http://localhost:3001/my/characters', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Set the Authorization header
                        'Content-Type': 'application/json', // Set the Content-Type header
                    },
                });
    
                if (!response.ok) { // Check if the response is not okay
                    throw new Error('Failed to fetch character IDs'); // Throw an error if the fetch failed
                }
    
                const characterIds = await response.json(); // Parse the response body as JSON
                // Fetch details for each character ID and store promises in an array
                const characterDetailsPromises = characterIds.map(id =>
                    fetch(`http://localhost:3001/my/character/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }).then(res => res.json()) // Parse each response as JSON
                );
                const characters = await Promise.all(characterDetailsPromises); // Wait for all promises to resolve
                setCharacters(characters); // Update the state with the fetched characters
                console.log("Fetched characters:", characters); // Log the fetched characters
            } catch (error) {
                console.error(error); // Log any errors that occur
            }
        };
    
        fetchCharacters(); 
    }, []);

    return (
        <div className="CharactersDisplay">
            <header className="CharacterDisplay-Header">
                <h2>Your Characters</h2> {/* Display a header for the characters display */}
            </header>
            <div>
                {/* Map over the characters state to display each character */}
                {characters.map((character, index) => (
                    <div key={index} className='displayCharBox'>
                        <h3>{character.name}</h3> {/* Display the character's name */}
                        <img src={character.carModelURL} alt={`Car for ${character.name}`} id='displayCar'/> {/* Display the character's car */}
                        <img src={character.characterModelURL} alt={`Character ${character.name}`} id='displayChar'/> {/* Display the character */}
                    </div>
                ))}
            </div>
            <button id='displayBack' onClick={() => navigate('/')}>Back</button> {/* Button to navigate back */}
        </div>
    );
}

export default CharactersDisplay;


