import React, { useState, useEffect } from 'react';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

function ManageCharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/characters');
        setCharacters(response.data);
      } catch (err) {
        setError('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        await axios.delete(`http://127.0.0.1:5000/characters/${id}`);
        setCharacters(characters.filter(char => char.id !== id));
        setSuccess('Character deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError('Failed to delete character');
      } finally {
        setLoading(false);
      }
    }
  };

  const heroes = characters.filter(char => char.alignment === 'hero');
  const villains = characters.filter(char => char.alignment === 'villain');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container fluid className="p-4 flex-grow-1 text-light text-center">
      <h1>Manage Characters</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {heroes.length > 0 && (
        <section className="mb-5">
          <h3 className="text-primary text-center mt-5">Heroes</h3>
          <Row className="g-4 justify-content-center">
            {heroes.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <CharacterCard character={character} onCharacterClick={() => navigate(`/edit/${character.id}`)} />
                <div className="text-center mt-2 w-100 mx-2">
                  <Button
                    variant="danger"
                    size="sm"
                    className="m-1"
                    onClick={() => handleDelete(character.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="m-1 px-3"
                    onClick={() => navigate(`/edit/${character.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {villains.length > 0 && (
        <section>
          <h3 className="text-danger text-center mt-5">Villains</h3>
          <Row className="g-4 justify-content-center">
            {villains.map(character => (
              <Col key={character.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <CharacterCard character={character} onCharacterClick={() => navigate(`/edit/${character.id}`)} />
                <div className="text-center mt-2 w-100 mx-2">
                  <Button
                    variant="danger"
                    size="sm"
                    className="m-1"
                    onClick={() => handleDelete(character.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="m-1 px-3"
                    onClick={() => navigate(`/edit/${character.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
}

export default ManageCharactersPage;