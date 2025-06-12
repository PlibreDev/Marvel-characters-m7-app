import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          ⚡ Marvel Universe
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/characters">
              Characters
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Add Character
            </Nav.Link>
            <Nav.Link as={Link} to="/manage">
              Manage Characters
            </Nav.Link>
            <Nav.Link as={Link} to="/edit">
              Edit Character
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;