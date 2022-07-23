import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FaHome } from "react-icons/fa";
import "./Breadcrumb.css";

function BreadCrumb() {
  return (
    <div>
      <Container className="mt-5">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <FaHome className="home-icon" /> INICIO
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/numero-de-turistas-y-nacionalidades" active>
            NÚMERO DE TURISTAS Y NACIONALIDADES
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </div>
  );
}

export default BreadCrumb;
