import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCharacterPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    powers: '',
    alignment: 'hero',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/characters/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load character');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.put(`http://127.0.0.1:5000/characters/${id}`, formData);
      setSuccess(true);
      setTimeout(() => navigate('/characters'), 2000);
    } catch (err) {
      setError('Failed to update character. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="py-4">
      <h2>Edit Character</h2>
      {success && <Alert variant="success">Character updated successfully! Redirecting...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Real Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.alias}
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
            value={formData.powers}
            onChange={handleChange}
            required
            placeholder="Enter powers"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAlignment">
          <Form.Label>Alignment</Form.Label>
          <Form.Select
            name="alignment"
            value={formData.alignment}
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
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Character
        </Button>
      </Form>
    </Container>
  );
}

export default EditCharacterPage;