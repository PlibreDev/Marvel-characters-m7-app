import React, { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="py-4">
      <h2>Manage Characters</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {characters.map(character => (
        <div key={character.id} className="mb-4">
          <CharacterCard character={character} onCharacterClick={() => navigate(`/edit/${character.id}`)} />
          <Button
            variant="danger"
            className="mt-2"
            onClick={() => handleDelete(character.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </Container>
  );
}

export default ManageCharactersPage;