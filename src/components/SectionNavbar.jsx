import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SectionNavbar() {
  return (
    <div className="d-none d-lg-block">
      <Navbar key="lg" bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Container>
            <Nav
              fill
              justify
              variant="tabs"
              defaultActiveKey="/numero-de-turistas-y-nacionalidades"
              className="justify-content-center flex-grow-1 pe-3"
            >
              <Nav.Link href="/numero-de-turistas-y-nacionalidades">
                Número de turistas y nacionalidades
              </Nav.Link>
              <Nav.Link href="#action2">Gasto turístico</Nav.Link>
              <Nav.Link href="#action2">Estancia turística</Nav.Link>
              <Nav.Link href="#action2">Expectativas turísticas</Nav.Link>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </div>
  );
}

export default SectionNavbar;
