// Define a list of characters with template object structure for name, car model URL, and character model URL.
// Initially, all values are set to null indicating they are placeholders to be filled.
const characterList = [
    {
        name: null,
        carModelURL: null,
        characterModelURL: null,
    }
]

/**
 * Asynchronously posts characters to the server.
 * Iterates over each character in the characterList and attempts to post it to the server.
 * Requires an authentication token stored in localStorage.
 */
const postCharactersToServer = async () => {
    // Retrieve the authentication token from localStorage.
    const token = localStorage.getItem('token'); // Adjust based on how you store the token
    if (!token) {
        console.log('Authentication token is not available.');
        return; // Exit the function if there is no token available.
    }

    // Loop through each character in the characterList
    for (const character of characterList) {
        // Check if the character has all necessary data before attempting to post
        if (character.name && character.carModelURL && character.characterModelURL) {
            try {
                // Attempt to post the character to the server
                const response = await fetch('http://localhost:3001/add-character', { // Adjust the URL as necessary
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    body: JSON.stringify(character), // Convert the character object to a JSON string for the request body
                });

                // Log the character being posted for debugging purposes
                console.log(JSON.stringify(character));

                if (!response.ok) {
                    // Log an error if the server responds negatively (e.g., status code 400 or 500)
                    console.error('Failed to add character:', response.status, response.statusText);
                    continue; // Skip to the next character in the list
                }

                // Parse the JSON response from the server
                const data = await response.json();
                console.log("Server response: ", data); // Log the server's response for debugging
            } catch (error) {
                // Catch and log any errors during the fetch request
                console.error("Error posting character to server: ", error);
            }
        } else {
            // Log a message if the character data is incomplete
            console.log("Character data is incomplete: ", character);
        }
    }
};

export {postCharactersToServer, characterList} ;
