import React from 'react';
import { Modal, Row, Col, Badge, Button } from 'react-bootstrap';

function CharacterModal({ character, show, onHide }) {
  if (!character) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered
      className="character-modal"
    >
      <Modal.Header 
        closeButton 
        className="bg-dark text-light border-secondary"
      >
        <Modal.Title>{character.alias}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="bg-dark text-light">
        <Row>
          <Col md={5} className="text-center">
            <img 
              src={character.image_url} 
              alt={character.alias}
              className="img-fluid rounded shadow"
              style={{ 
                maxHeight: '400px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400/1e293b/64748b?text=No+Image';
              }}
            />
          </Col>
          
          <Col md={7}>
            <div className="character-details">
              <h4 className="mb-3">
                {character.alias}
                <Badge 
                  className={`ms-3 ${character.alignment === 'hero' ? 'bg-primary' : 'bg-danger'}`}
                >
                  {character.alignment.toUpperCase()}
                </Badge>
              </h4>
              
              <div className="mb-4">
                <h6 className="text-info">Real Name:</h6>
                <p className="mb-0">{character.name}</p>
              </div>
              
              <div className="mb-4">
                <h6 className="text-info">Powers & Abilities:</h6>
                <p className="mb-0" style={{ lineHeight: '1.6' }}>
                  {character.powers}
                </p>
              </div>
              
              <div className="character-stats mt-4">
                <small className="text-muted">
                  Character ID: #{character.id}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CharacterModal;