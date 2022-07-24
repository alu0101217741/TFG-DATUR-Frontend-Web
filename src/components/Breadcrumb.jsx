import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FaHome } from "react-icons/fa";
import "./Breadcrumb.css";

function BreadCrumb({ breadcrumItem, breadcrumItemLink }) {
  return (
    <div>
      <Container className="mt-5">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <FaHome className="home-icon" /> INICIO
          </Breadcrumb.Item>
          <Breadcrumb.Item href={breadcrumItemLink} active>
            {breadcrumItem}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </div>
  );
}

export default BreadCrumb;
