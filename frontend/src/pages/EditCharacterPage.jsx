import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';

function EditCharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/characters/${id}`);
        setCharacter(response.data);
      } catch (error) {
        setError('Character not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.put(`http://127.0.0.1:5000/characters/${id}`, character);
      setSuccess('Character updated successfully!');
      setTimeout(() => navigate('/manage'), 1500);
    } catch (err) {
      setError('Failed to update character.');
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleCharacterClick = (char) => {
    setSelectedCharacter(char);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading character...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="justify-content-center">
        <Col md={6} lg={5} className="d-flex flex-column align-items-center">
          <h1 className="mb-4 text-center">Edit Character</h1>
          <CharacterCard
            character={character}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(f => !f)}
            onCharacterClick={handleCharacterClick}
          />
          <Button
            variant="outline-secondary"
            size="sm"
            className="mt-2"
            onClick={() => setIsFlipped(f => !f)}
          >
            {isFlipped ? 'Flip Back' : 'Flip Card'}
          </Button>
        </Col>
        <Col md={6} lg={5} className="mt-5 mt-md-0">
          <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded shadow">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Real Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={character.name || ''}
                onChange={handleChange}
                required
                placeholder="Enter real name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAlias">
              <Form.Label>Alias</Form.Label>
              <Form.Control
                type="text"
                name="alias"
                value={character.alias || ''}
                onChange={handleChange}
                required
                placeholder="Enter alias"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPowers">
              <Form.Label>Powers</Form.Label>
              <Form.Control
                as="textarea"
                name="powers"
                value={character.powers || ''}
                onChange={handleChange}
                required
                placeholder="Enter powers"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAlignment">
              <Form.Label>Alignment</Form.Label>
              <Form.Select
                name="alignment"
                value={character.alignment || ''}
                onChange={handleChange}
                required
              >
                <option value="hero">Hero</option>
                <option value="villain">Villain</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image_url"
                value={character.image_url || ''}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
      <CharacterModal
        character={selectedCharacter}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default EditCharacterPage;