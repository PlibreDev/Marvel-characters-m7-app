import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

// pages
import HomePage from './pages/HomePage.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import CreateCharacterPage from './pages/CreateCharacterPage.jsx';
import EditCharacterPage from './pages/EditCharacterPage.jsx';
import ManageCharactersPage from './pages/ManageCharactersPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// components
import NavbarComponent from './components/NavbarComponent.jsx';

function App() {
  try {
    return (
      <Router>
        <div className="App">
          <NavbarComponent />
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/create" element={<CreateCharacterPage />} />
              <Route path="/edit/:id" element={<EditCharacterPage />} />
              <Route path="/manage" element={<ManageCharactersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    );
  } catch (error) {
    console.error('Error rendering App component:', error);
    return <div>Error: {error.message}</div>;
  }
}

export default App;