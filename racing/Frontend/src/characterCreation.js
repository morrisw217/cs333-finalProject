import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CarSelection from './components/carSelection.js'; 
import {CharacterGalleries} from './components/galleries.js';
import CharacterModels from './components/characterModels.js'; 
import { characterList } from './components/characterInfo.js'; 

// CharacterCreation component for creating a new character
function CharacterCreation() {
    const navigate = useNavigate(); // Hook to navigate between routes
    const [currentSlides, setCurrentSlides] = useState([0, 0, 0]); // State to track current slide for each gallery
    const [view, setView] = useState('character'); // State to track the current view of the component

    // Effect hook to log the current slide selections whenever they change
    useEffect(() => {
        console.log("Current Selections Indexes: ", currentSlides);
    }, [currentSlides]);

    // Function to navigate through slides in the galleries
    const plusSlides = (n, slideshowIndex) => {
        setCurrentSlides(currentSlides.map((slide, index) => {
            if (index === slideshowIndex) {
                const galleryLength = CharacterGalleries[slideshowIndex].length; // Determine the gallery's length
                return (slide + n + galleryLength) % galleryLength; // Calculate the next slide index
            }
            return slide; // Return the current slide index for other galleries
        }));
    };

    // Function to determine the image style based on the gallery index
    const getImageStyle = (galleryIndex) => {
        switch(galleryIndex) {
            case 0: // Style for helmets
                return { width: '100px', height: '100px', objectFit: 'cover' };
            case 1: // Style for jackets
                return { width: '150px', height: '120px', objectFit: 'cover' };
            case 2: // Style for pants
                return { width: '80px', height: '160px', objectFit: 'cover' };
            default: // Default style if none of the above
                return { width: '100px', height: '100px', objectFit: 'cover' };
        }
    };

    // Function to handle saving the character and continuing to the next view
    const handleSaveAndContinue = () => {
        console.log("Current Selections Indexes: ", currentSlides);

        // Record the current selections for helmet, jacket, and pants
        const selection = {
            helmet: currentSlides[0],
            jacket: currentSlides[1],
            pants: currentSlides[2],
        };

        // Find the character model that matches the current selections
        const selectedModel = CharacterModels.find(model => 
            model.helmet === selection.helmet &&
            model.jacket === selection.jacket &&
            model.pants === selection.pants
        );

        if (selectedModel) {
            console.log("Selected Model URL: ", selectedModel.url);

            // Update the characterList with the URL of the selected model
            characterList[0].characterModelURL = selectedModel.url;
            console.log("Updated characterList: ", characterList);
        } else {
            console.log("No model found for the current selection.");
        }

        setView('CarSelection'); // Change the view to car selection
    };

    // Function to navigate back to the character selection view
    const handleBack = () => {
        setView('character'); 
    };

    // Render the component UI
    return (
        <div className="CharacterCreation">
            <h1>Customize Your Character</h1>
            {view === 'character' ? (
                <>
                    {CharacterGalleries.map((gallery, galleryIndex) => (
                        // Render the slideshow container for each character gallery
                        <div key={galleryIndex} className="slideshow-container">
                            <button className="prev" onClick={() => plusSlides(-1, galleryIndex)}>&#10094;</button>
                            {gallery.map((item, itemIndex) => (
                                // Render each slide in the gallery
                                <div key={item.id} className="mySlides_fade" style={{display: itemIndex === currentSlides[galleryIndex] ? 'block' : 'none'}}>
                                    <img src={item.src} alt="Item display" style={getImageStyle(galleryIndex)} />
                                </div>
                            ))}
                            <button className="next" onClick={() => plusSlides(1, galleryIndex)}>&#10095;</button>
                        </div>
                    ))}
                    <div className='creationNavButtons'>
                        <button className='backToNav' onClick={() => navigate('/')}>Back</button>
                        <button className='toCar' type='button' onClick={handleSaveAndContinue}>Save and Continue</button>
                    </div>
                </>
            ) : (
                // Render the CarSelection component if the view is set to 'CarSelection'
                <CarSelection onBack={handleBack}/>
            )}
        </div>
    );
}

export default CharacterCreation;






