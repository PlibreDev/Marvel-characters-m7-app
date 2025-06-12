import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="display-3 fw-bold mb-4">
            Welcome to Marvel Universe
          </h1>
          <p className="lead mb-4">
            Explore your favorite heroes and villains from the Marvel Universe. 
            View character details, manage your collection, and discover new characters.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button as={Link} to="/characters" variant="primary" size="lg">
              View Characters
            </Button>
            <Button as={Link} to="/create" variant="outline-light" size="lg">
              Add Character
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;