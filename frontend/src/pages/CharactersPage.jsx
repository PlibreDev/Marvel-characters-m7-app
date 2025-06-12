import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard.jsx';
import CharacterModal from '../components/CharacterModal.jsx';

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch characters from API
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/characters');
      setCharacters(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load characters. Make sure your Flask server is running.');
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const heroes = characters.filter(char => char.alignment === 'hero');
  const villains = characters.filter(char => char.alignment === 'villain');

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading characters...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-5">Marvel Universe</h1>
      
      {/* Heroes Section */}
      {heroes.length > 0 && (
        <section className="mb-5">
          <h2 className="text-center mb-4 text-primary">
            Heroes
          </h2>
          <Row className="g-4 justify-content-center">
            {heroes.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <CharacterCard 
                  character={character}
                  onCharacterClick={handleCharacterClick}
                />
              </Col>
            ))}
          </Row>
        </section>
      )}

      {villains.length > 0 && (
        <section className="mb-5">
          <h2 className="text-center mb-4 text-danger">
            Villains
          </h2>
          <Row className="g-4 justify-content-center">
            {villains.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <CharacterCard 
                  character={character}
                  onCharacterClick={handleCharacterClick}
                />
              </Col>
            ))}
          </Row>
        </section>
      )}

      <CharacterModal 
        character={selectedCharacter}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default CharactersPage;