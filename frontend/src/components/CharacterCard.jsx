import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

function CharacterCard({ character, onCharacterClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => setIsFlipped(!isFlipped);

  const handleCharacterSelect = (e) => {
    e.stopPropagation();
    onCharacterClick(character);
  };

  return (
    <div
      className={`character-card ${character.alignment} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="card-inner">
        {/* Front */}
        <Card className="card-front w-100 h-100 border-0 bg-transparent">
          <div className="position-relative h-100">
            <Card.Img
              variant="top"
              src={character.image_url}
              alt={character.name}
              onError={e => {
                e.target.src = 'https://via.placeholder.com/400x240/1e293b/64748b?text=No+Image';
              }}
              className="card-img-top h-100"
            />
            <Card.Title className="character-name text-center fw-medium fs-2 text-white position-absolute bottom-0 w-100 p-2">
              {character.name}
            </Card.Title>
          </div>
        </Card>

        {/* Back */}
        <Card className="card-back w-100 h-100 d-flex flex-column justify-content-between p-3 border-0">
          <div>
            <Card.Title className="character-name text-center mt-2 text-white fw-bold fs-3">
              {character.name}
            </Card.Title>
            <Card.Subtitle className="character-alias my-2 text-center fw-medium text-white">
              {character.alias}
            </Card.Subtitle>
            <div className="text-center">
              <Badge bg={character.alignment === 'hero' ? 'primary' : 'danger'} className="mb-3">
                {character.alignment.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Card.Text className="character-powers fs-6 text-center">
              <strong className="fs-">Powers:</strong><br />
              {character.powers}
            </Card.Text>
          </div>
          <div className="text-center text-white">
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleCharacterSelect}
            >
              View Details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CharacterCard;