import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex">
          <img
            src="/Marvel_Logo.png" 
            alt="Marvel Logo"
            height="36"
            className="me-2"
            style={{ background: 'white', borderRadius: '4px', padding: '2px' }}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/characters">
              Character Cards
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create Character
            </Nav.Link>
            <Nav.Link as={Link} to="/manage">
              Manage Characters
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;