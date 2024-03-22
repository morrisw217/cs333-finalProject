// Import React and useState hook
import React, { useState } from 'react';

// Import the components and any other necessary modules
import { CarGallery } from './galleries'; // Assuming CarGallery is an array of car objects
import CharacterName from './characterName'; // Your character naming component
import { characterList } from './characterInfo'; 

// The CarSelection component
function CarSelection({ onBack }) {
  // State to manage the current step of the process
  const [step, setStep] = useState('selectCar'); // 'selectCar', 'nameCharacter', 'saved'

  // State for managing the car selection slideshow
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to navigate through the car slideshow
  const plusSlides = (n) => {
    const numberOfCars = CarGallery[0].length;
    setCurrentSlide((currentSlide + n + numberOfCars) % numberOfCars);
  };

  // Function to handle saving the selected car and moving to the character naming step
  const handleSaveAndContinueCar = () => {
    const selectedCar = CarGallery[0][currentSlide];
    console.log("Selected Car URL: ", selectedCar.src); // Log the selected car URL for debugging
    characterList[0].carModelURL = selectedCar.src;
    console.log("Updated characterList: ", characterList);
    setStep('nameCharacter'); // Move to the character naming step
  };

  // Function to handle saving the character name and moving to the final saved message
  const handleCharacterSaveAndContinue = () => {
    console.log("Character Name Saved"); // Log for debugging
    setStep('saved'); // Move to the final message step
  };

  const handleBackToCarSelection = () => {
    setStep('selectCar');
  };

  return (
    <div className="CarSelection">
      {step === 'selectCar' && (
        <>
          <h3>Select Your Car</h3>
          <div className="slideshow-container">
            <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
            <img src={CarGallery[0][currentSlide].src} alt="Car" style={{ width: '75%', height: 'auto' }} />
            <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
          </div>
          <div className='carNavButtons'>
            <button className='backToCharCreation' type='button' onClick={onBack}>Back</button>
            <button className='toName' type='button' onClick={handleSaveAndContinueCar}>Save and Continue</button>
          </div>
        </>
      )}

      {step === 'nameCharacter' && (
        <CharacterName onSaveAndContinue={handleCharacterSaveAndContinue} onBackToCarSelection={handleBackToCarSelection} />
      )}

      {step === 'saved' && (
        <h3>Character Saved!</h3>
      )}
    </div>
  );
}

export default CarSelection;






