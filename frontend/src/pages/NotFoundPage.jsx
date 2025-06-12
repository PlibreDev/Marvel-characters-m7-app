import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            Even superheroes get lost sometimes. Let's get you back to safety.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Return Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;