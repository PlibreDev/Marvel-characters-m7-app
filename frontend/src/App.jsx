import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import pages
import HomePage from './pages/HomePage.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import CreateCharacterPage from './pages/CreateCharacterPage.jsx';
import EditCharacterPage from './pages/EditCharacterPage.jsx';
import ManageCharactersPage from './pages/ManageCharactersPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Import components
import NavbarComponent from './components/NavbarComponent.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/create" element={<CreateCharacterPage />} />
          <Route path="/edit/:id" element={<EditCharacterPage />} />
          <Route path="/manage" element={<ManageCharactersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;