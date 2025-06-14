import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const wikimediaUrls = [
  "https://upload.wikimedia.org/wikipedia/en/8/8c/Jean_Grey_%28Modern%29.webp",
  "https://static.wikia.nocookie.net/marveldatabase/images/f/f0/Adam_Warlock_%28Earth-616%29_from_Infinity_Wars_Infinity_Vol_1_1_001.jpg/revision/latest?cb=20190302234015",
  "https://upload.wikimedia.org/wikipedia/en/5/5d/Wolverine_%28James_%27Logan%27_Howlett%29.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Cyclops_%28Scott_Summers_circa_2019%29.png/250px-Cyclops_%28Scott_Summers_circa_2019%29.png",
  "https://upload.wikimedia.org/wikipedia/en/9/94/Gambit_%28Marvel_Comics%29.png",
  "https://upload.wikimedia.org/wikipedia/en/4/4f/Doctor_Strange_Vol_4_2_Ross_Variant_Textless.jpg",
  "https://upload.wikimedia.org/wikipedia/en/1/1b/X-men_angel_archangel.jpg",
  "https://upload.wikimedia.org/wikipedia/en/6/66/Doctor_Doom_%28Marvel_Comics_character%29.png",
  "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/51/Mysterio_Infobox.png/revision/latest?cb=20241008191935",
  "https://upload.wikimedia.org/wikipedia/en/e/ec/Red_Skull_%28Johann_Schmidt%29.png",
  "https://upload.wikimedia.org/wikipedia/en/a/a0/Apocalypse_%28En_Sabah_Nur_-_circa_2009%29.jpg",
  "https://static.wikia.nocookie.net/monster/images/3/3b/Carnage_marvel.jpg/revision/latest?cb=20210607120528",
  "https://static.wikia.nocookie.net/marveldatabase/images/7/74/Marvel_Comics_Vol_1_1000_Artgerm_Collectibles_Exclusive_Emma_Frost_Virgin_Variant.jpg/revision/latest/scale-to-width-down/1000?cb=20211002082122",
  "https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Immortal_Thor_Vol_1_17_Go_Variant_Textless.jpg/revision/latest/scale-to-width-down/1000?cb=20241123063641",
];

function CreateCharacterPage() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    powers: '',
    alignment: 'hero',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUrlClick = (url) => {
    setFormData({ ...formData, image_url: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('http://127.0.0.1:5000/characters', formData);
      setSuccess(true);
      setTimeout(() => navigate('/characters'), 2000);
    } catch (err) {
      setError('Failed to create character. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 py-4 bg-dark p-5 border-radius-12 flex-grow-1 text-light">
      <h2 className="text-center">Create New Character</h2>
      <p className="text-center mb-5">Fill in the details below to create a new character. If you'd like to create one of the suggested characters, just click the link to add the URL to the image field.</p>
      {success && <Alert variant="success">Character created successfully! Redirecting...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
              Create Character
            </Button>
          </Form>
          {/* Suggestions BELOW the form */}
          <div className="mt-4">
            <div className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>Character Image Suggestions:</div>
            <ul className="list-unstyled" style={{ maxHeight: 160, overflowY: 'auto' }}>
              {wikimediaUrls.map((url, idx) => (
                <li key={idx}>
                  <Button
                    variant="link"
                    className="p-0 text-info"
                    style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}
                    onClick={() => handleUrlClick(url)}
                  >
                    {url}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}

export default CreateCharacterPage;