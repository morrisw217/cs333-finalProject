// Import the mongoose library for MongoDB interactions
import mongoose from 'mongoose';

/**
 * Define the schema for a character, including their name, car model URL, and character model URL.
 * Each field is defined to be a string with a default value of null, allowing for flexibility in character creation.
 */
const CharacterSchema = new mongoose.Schema({
  name: {
    type: String, // Data type for the name field
    default: null, // Default value if none is provided
  },
  carModelURL: { 
    type: String, // Data type for the car model URL field
    default: null, // Default value if none is provided
  },
  characterModelURL: { 
    type: String, // Data type for the character model URL field
    default: null, // Default value if none is provided
  },
});

/**
 * Define the schema for a user, including username, password, and an array of characters.
 * Username is unique and required, ensuring no two users have the same username.
 * Password is also required for authentication purposes.
 * The characters field is an array of CharacterSchema, allowing users to have multiple characters.
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String, // Data type for the username field
    default: null, // Default value if none is provided
    unique: true, // Ensures username is unique across all users
    required: true // Makes the username a required field for user creation
  },
  password: {
    type: String, // Data type for the password field
    default: null, // Default value if none is provided
    required: true // Makes the password a required field for user creation
  },
  characters: [CharacterSchema] // An array of character schemas, allowing users to own multiple characters
});

// Create a User model from the UserSchema, making it available for CRUD operations in the MongoDB database.
export const User = mongoose.model('User', UserSchema);

