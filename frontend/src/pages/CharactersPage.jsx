import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard.jsx';
import CharacterModal from '../components/CharacterModal.jsx';
import { useNavigate } from 'react-router-dom';

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const navigate = useNavigate();

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

  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
    <Container
      fluid
      className="py-4 flex-grow-1 text-light min-vh-100 min-vw-90 d-flex flex-column align-items-center"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <h1 className="text-center mb-2 w-100">Character Deck</h1>
      <p className="text-center mb-4 w-100">View your available characters below. To edit or delete characters, visit the Manage Characters Page</p>
      
      {heroes.length > 0 && (
        <section className="mb-5 w-100">
          <h2 className="text-center mt-5 text-primary">Heroes</h2>
          <Row className="g-3 justify-content-center w-100">
            {heroes.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2} className="d-flex flex-column align-items-center">
                <CharacterCard 
                  character={character}
                  onCharacterClick={handleCharacterClick}
                  isFlipped={!!flippedCards[character.id]}
                  onFlip={() => handleFlip(character.id)}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-50"
                  onClick={() => handleFlip(character.id)}
                >
                  {flippedCards[character.id] ? 'Flip Back' : 'Flip Card'}
                </Button>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {villains.length > 0 && (
        <section className="mb-5 w-100">
          <h2 className="text-center mt-5 text-danger">Villains</h2>
          <Row className="g-4 justify-content-center w-100">
            {villains.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2} className="d-flex flex-column align-items-center">
                <CharacterCard 
                  character={character}
                  onCharacterClick={handleCharacterClick}
                  isFlipped={!!flippedCards[character.id]}
                  onFlip={() => handleFlip(character.id)}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-50"
                  onClick={() => handleFlip(character.id)}
                >
                  {flippedCards[character.id] ? 'Flip Back' : 'Flip Card'}
                </Button>
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