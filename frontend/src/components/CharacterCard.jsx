import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

function CharacterCard({ character, onCharacterClick, isFlipped, onFlip }) {
  const handleCharacterSelect = (e) => {
    e.stopPropagation();
    onCharacterClick(character);
  };

  // Use Bootstrap border and shadow classes
  const borderClass = character.alignment === 'hero' ? 'border-primary' : 'border-danger';

  // Card container for aspect ratio
  const containerStyle = {
    aspectRatio: '7 / 10',
    maxWidth: 300,
    minWidth: 200,
    width: '100%',
    cursor: 'pointer',
    perspective: 1000,
    border: '5px solid white',
    borderRadius: '1.2rem',   
    boxSizing: 'border-box',
    background: 'white',
  };

  // Flipping styles
  const flipWrapperStyle = {
    transformStyle: 'preserve-3d',
    position: 'relative',
    height: '100%',
    width: '100%',
    transform: isFlipped ? 'rotateY(180deg)' : 'none',
  };

  const cardFaceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '1rem',
    overflow: 'hidden',
  };

  const cardBackStyle = {
    ...cardFaceStyle,
    transform: 'rotateY(180deg)',
  };

  return (
    <div
      style={containerStyle}
      className="mx-auto mb-4"
    >
      <div style={flipWrapperStyle}>
        {/* Front */}
        <Card
          className={`h-100 w-100 bg-dark text-light shadow-lg ${borderClass}`}
          style={cardFaceStyle}
        >
          <div className="h-100 d-flex flex-column">
            <Card.Img
              variant="top"
              src={character.image_url}
              alt={character.name}
              className="flex-grow-1 object-fit-cover"
              style={{ minHeight: 0, minWidth: 0, borderRadius: '0.75rem 0.75rem 0 0' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400/1e293b/64748b?text=No+Image';
              }}
            />
            <span
              className="w-100 text-center text-white fw-700 fs-4 p-2 position-absolute bottom-0 start-50 translate-middle-x"
              style={{
                fontSize: '1.2rem',
                textShadow:
                  character.alignment === 'hero'
                    ? '2px 2px 8px #000, 0 0 8px #3b82f6'
                    : '2px 2px 8px #000, 0 0 8px #ef4444',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: '100%',
                background: 'none',
              }}
            >
              {character.name}
            </span>
          </div>
        </Card>

        {/* Back */}
        <Card
          className={`h-100 w-100 bg-dark text-white shadow-lg ${borderClass}`}
          style={cardBackStyle}
        >
          <Card.Body className="d-flex flex-column justify-content-between h-100 p-3">
            <div>
              <Card.Title className="text-center mb-2">{character.name}</Card.Title>
              <Card.Subtitle className="text-center mb-3 text-white">{character.alias}</Card.Subtitle>
              <div className="text-center mb-3">
                <Badge bg={character.alignment === 'hero' ? 'primary' : 'danger'}>
                  {character.alignment.toUpperCase()}
                </Badge>
              </div>
              <Card.Text className="flex-grow-1 text-center">
                <strong>Powers:</strong><br />
                {character.powers}
              </Card.Text>
            </div>
            <div className="text-center">
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleCharacterSelect}
                className="me-2"
              >
                View Details
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CharacterCard;