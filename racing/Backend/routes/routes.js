import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/users.js'; 

// Initialize express router
const router = express.Router();

/**
 * Middleware to authenticate API requests.
 * It checks for a 'Bearer' token in the Authorization header,
 * validates it, and attaches the user's ID to the request object.
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(403).send('Authentication token is required.');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send('Token format is "Bearer <token>".');
  }
  
  const token = parts[1];
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
  } catch (error) {
      res.status(401).send('Invalid or expired token.');
  }
};

// Endpoint for creating a new user account
router.post('/create-account', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        
        // Hash password before saving to database for security
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.status(201).send('Account created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error creating account: ${error.message}`);
    }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    // Generate a token valid for 24 hours after successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });
    res.send({ message: 'Login successful', token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Endpoint for adding a new character to the user's account
router.post('/add-character', authenticate, async (req, res) => {
  const { name, carModelURL, characterModelURL } = req.body;
  
  if (!name || !carModelURL || !characterModelURL) {
    return res.status(400).send('All character information must be provided');
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Add new character information to the user's document
    user.characters.push({ name, carModelURL, characterModelURL });
    await user.save();
    res.status(200).send('Character added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

// Endpoint for retrieving a list of character IDs belonging to the authenticated user
router.get('/my/characters', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'characters._id');
    if (!user) {
      return res.status(404).send('User not found');
    }
    const characterIds = user.characters.map(character => character._id);
    res.send(characterIds);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
});

// Endpoint for getting detailed information about a specific character by ID
router.get('/my/character/:characterId', authenticate, async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const user = await User.findById(req.userId, 'characters');
    const character = user.characters.find(char => char._id.toString() === characterId);
    if (!character) {
      return res.status(404).send('Character not found');
    }
    res.send(character);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
});


export default router;

