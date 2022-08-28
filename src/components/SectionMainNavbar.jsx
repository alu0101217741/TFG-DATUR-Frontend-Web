import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  BsFillBarChartFill,
  BsFillBarChartLineFill,
  BsGraphUp,
  BsPieChartFill,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SectionMainNavbar.css";

function SectionMainNavbar({ activeLink }) {
  return (
    <>
      <div className="d-none d-lg-block">
        <Navbar key="lg" expand="lg">
          <Navbar.Brand className="navbar-name" href="/">
            <img src="images/datur.png" alt="Datur logo" />
          </Navbar.Brand>
        </Navbar>
      </div>
      <div className="d-lg-none">
        <Navbar className="navbar-bg" key="lg" expand="lg">
          <Container>
            <Navbar.Brand className="navbar-name" href="/">
              <img src="images/daturMobile.png" alt="Datur logo" />
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
                  <img src="images/daturMobileName.png" alt="Datur logo" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    as={Link}
                    to="/"
                    className={
                      activeLink === "/"
                        ? "section-name active-background"
                        : "section-name"
                    }
                  >
                    <FaHome className="custom-icon" /> Inicio
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/numero-de-turistas"
                    className={
                      activeLink === "/numero-de-turistas"
                        ? "section-name active-background"
                        : "section-name"
                    }
                  >
                    <BsGraphUp className="custom-icon" /> Número de turistas
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/gasto-turistico"
                    className={
                      activeLink === "/gasto-turistico"
                        ? "section-name active-background"
                        : "section-name"
                    }
                  >
                    <BsFillBarChartLineFill className="custom-icon" />
                    Gasto turístico
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/estancia-turistica"
                    className={
                      activeLink === "/estancia-turistica"
                        ? "section-name active-background"
                        : "section-name"
                    }
                  >
                    <BsPieChartFill className="custom-icon" />
                    Estancia turística
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/expectativas-turisticas"
                    className={
                      activeLink === "/expectativas-turisticas"
                        ? "section-name active-background"
                        : "section-name"
                    }
                  >
                    <BsFillBarChartFill className="custom-icon" /> Expectativas
                    turísticas
                  </Nav.Link>
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
