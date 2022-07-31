import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CustomButton } from "./CustomButton";
import "./SectionMainNavbar.css";

function SectionMainNavbar() {
  return (
    <>
      <div className="d-none d-lg-block">
        <Navbar
          className="navbar-bg sticky-nav"
          key="lg"
          expand="lg"
          sticky="top"
        >
          <Container>
            <Navbar.Brand className="navbar-name" href="/">
              Turismo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className="mobile-menu"
                  id="offcanvasNavbarLabel-expand-lg"
                >
                  Secciones
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link className="nav-section" href="#action1">
                    ¿Quiénes somos?
                  </Nav.Link>
                  <CustomButton buttonStyle="btn--outline">Ayuda</CustomButton>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      <div className="d-lg-none">
        <Navbar clasName="navbar-bg" key="lg" expand="lg">
          <Container>
            <Navbar.Brand className="navbar-name" href="/">
              Turismo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className="mobile-menu"
                  id="offcanvasNavbarLabel-expand-lg"
                >
                  Secciones
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">
                    Número de turistas y nacionalidades
                  </Nav.Link>
                  <Nav.Link href="#action1">Gasto turístico</Nav.Link>
                  <Nav.Link href="#action1">Estancia turística</Nav.Link>
                  <Nav.Link href="#action1">Expectativas turísticas</Nav.Link>
                  <Nav.Link href="#action1">¿Quiénes somos?</Nav.Link>
                  <Nav.Link href="#action1">Ayuda</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default SectionMainNavbar;
