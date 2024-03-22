import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { characterList } from './characterInfo';
import {postCharactersToServer} from './characterInfo'

function CharacterName({ onBackToCarSelection }) {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(''); // State to store the error message

    const handleSaveCharacter = () => {
        if (!name.trim()) { // Check if the name is empty or just whitespace
            setError('Please enter a name for your character.'); // Set an error message
            return; // Stop the function from proceeding
        }
        characterList[0].name = name;
        console.log('Saved Name:', name);
        console.log("Updated characterList: ", characterList);
        setIsSaved(true);
        setError(''); // Reset error message upon successful save
        postCharactersToServer(); // Post all of the info in CharacterList to the add-character endpoint.
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (error) setError(''); // Clear error message when user starts typing
    };

    return (
        <div className="CharacterName">
            {!isSaved ? (
                <>
                    <h3>Name Your Character</h3>
                    <form id="nameForm">
                        {error && <div style={{ color: 'yellow' }}>{error}</div>}
                        <input type="text" placeholder="John Doe" value={name} onChange={handleNameChange}/>
                    </form>
                    <div className='finalButtons'>
                        <button className='backToCarSelection' type='button' onClick={onBackToCarSelection}>Back</button>
                        <button className='submitChar' type='button' onClick={handleSaveCharacter}>Save Character</button>
                    </div>
                </>
            ) : (
                <div className="characterSaved">
                    <h3>Character Saved!</h3>
                    <button className='toDisplay' type='button' onClick={() => navigate('/charactersDisplay')}>Show Characters</button>
                </div>
            )}
        </div>
    );
}

export default CharacterName;


