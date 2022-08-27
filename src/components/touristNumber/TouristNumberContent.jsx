import React from "react";
import { Container } from "react-bootstrap";
import "./TouristNumberContent.css";

function TouristNumber() {
  return (
    <div>
      <Container className="mt-4 text-style">
        <Container>
          <h2 className="section-title">Información de la sección</h2>
          <Container>
            <p className="mt-4 text-start text-wrap link-style">
              En esta sección se proporciona una visión global acerca de los
              turistas que visitan las Islas Canarias. Para ello, se muestra la
              evolución del número de turistas en los últimos años, sus
              nacionalidades, y la forma en la que se distribuyen por las islas.
              Para generar estas gráficas se han procesado los siguientes
              datasets del repositorio &nbsp;
              <b>
                <a
                  target="_blank"
                  href="https://datos.canarias.es/portal/"
                  rel="noreferrer"
                >
                  Canarias Datos Abiertos
                </a>
              </b>
              :
            </p>
            <ul className="mt-4 link-style">
              <li>
                <b>
                  <a
                    target="_blank"
                    href="https://datos.canarias.es/catalogos/general/dataset/turistas-que-han-visitado-canarias-segun-lugares-de-residencia-por-periodos1"
                    rel="noreferrer"
                  >
                    Turistas que han visitado Canarias según lugares de
                    residencia por periodos.
                  </a>
                </b>
              </li>
              <li>
                <b>
                  <a
                    target="_blank"
                    href="https://datos.canarias.es/catalogos/general/dataset/turistas-principales-segun-lugares-de-residencia-por-islas-de-canarias-y-periodos1"
                    rel="noreferrer"
                  >
                    Turistas principales según lugares de residencia por islas
                    de Canarias y periodos.
                  </a>
                </b>
              </li>
            </ul>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default TouristNumber;
