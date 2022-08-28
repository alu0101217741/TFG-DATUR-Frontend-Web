import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <Container className="footer-container text-style">
        <Row>
          <Col lg={4} xs={12}>
            <div className="footer-img">
              <img src="images/daturLogo.png" alt="Datur logo" />
            </div>
            <p>
              Esta web muestra información acerca del turismo canario, a través
              de la visualización de los últimos datos disponibles para cuatro
              de los aspectos más relevantes del sector. Estos datos se obtienen
              del repositorio Canarias Datos Abiertos, de manera que la
              información de la web se actualiza a medida que lo hace la fuente
              oficial.
            </p>
          </Col>
          <Col lg={4} xs={12} className="footer-main-content link-style">
            <h2>Enlaces recomendados</h2>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://datos.canarias.es/portal/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Canarias Datos Abiertos
                </a>
              </li>
              <li>
                <a
                  href="http://www.gobiernodecanarias.org/istac/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instituto Canario de Estadística
                </a>
              </li>
              <li>
                <a
                  href="https://www.highcharts.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Highcharts
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={4} xs={12} className="footer-links text-style">
            <h2>Contacto</h2>
            <p>
              Web realizada por Alberto Mendoza Rodríguez como proyecto de
              Trabajo de Fin de Grado.
            </p>
            <Row>
              <Col xs={6}>
                <a href="mailto:albertomrodriguez03@gmail.com">
                  <img
                    src="https://img.icons8.com/color/48/000000/gmail.png"
                    alt="gmail icon"
                    className="gmail-icon"
                  />
                </a>
              </Col>
              <Col xs={6}>
                <a
                  href="https://www.linkedin.com/in/alberto-mendoza-rodríguez-6a672a234"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/linkedin.png"
                    alt="linkedin icon"
                    className="linkedin-icon"
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
