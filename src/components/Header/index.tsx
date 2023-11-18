import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="">Full Stacking FIAP</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} className="nav-Item" to="/">
              Minhas Tarefas
            </Nav.Link>
            <Nav.Link as={Link} className="nav-Item" to="/cadastro">
              Nova Tarefa
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;