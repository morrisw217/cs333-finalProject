import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage.js';
import CharacterCreation from './characterCreation.js';
import CharactersDisplay from './charactersDisplay.js';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characterCreation" element={<CharacterCreation />} />
        <Route path="/charactersDisplay" element={<CharactersDisplay/>} />
      </Routes>
    </Router>
  );
}

export default App;

