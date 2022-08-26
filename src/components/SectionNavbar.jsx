import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function SectionNavbar({ activeLink }) {
  return (
    <div className="d-none d-lg-block">
      <Navbar key="lg" bg="light" expand="lg">
        <Container fluid>
          <Container>
            <Nav
              fill
              justify
              variant="tabs"
              className="justify-content-center flex-grow-1 pe-3"
            >
              <Nav.Link
                as={Link}
                to="/numero-de-turistas"
                className={activeLink === "/numero-de-turistas" ? "active" : ""}
              >
                Número de turistas
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/gasto-turistico"
                className={activeLink === "/gasto-turistico" ? "active" : ""}
              >
                Gasto turístico
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/estancia-turistica"
                className={activeLink === "/estancia-turistica" ? "active" : ""}
              >
                Estancia turística
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/expectativas-turisticas"
                className={
                  activeLink === "/expectativas-turisticas" ? "active" : ""
                }
              >
                Expectativas turísticas
              </Nav.Link>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}

export default SectionNavbar;
