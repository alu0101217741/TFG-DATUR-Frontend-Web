import React from "react";
import { Container } from "react-bootstrap";

function TouristStayContent() {
  return (
    <div>
      <div>
        <Container className="mt-4 text-style link-style">
          <Container>
            <h2 className="section-title">Información de la sección</h2>
            <Container>
              <p className="mt-4 text-start text-wrap">
                Esta sección muestra diversa información sobre la cantidad de
                días que permanecen los turistas en Canarias, teniendo en cuenta
                factores relevantes como su nacionalidad, isla que visitan o el
                tipo de alojamiento en el que se hospedan. Para generar estas
                gráficas se han procesado los siguientes datasets del
                repositorio &nbsp;
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
              <ul className="mt-4">
                <li>
                  <b>
                    <a
                      target="_blank"
                      href="https://datos.canarias.es/catalogos/general/dataset/estancia-media-de-los-viajeros-segun-lugares-de-residencia-por-islas-de-alojamiento-de-canarias1"
                      rel="noreferrer"
                    >
                      Estancia media de los viajeros según lugares de residencia
                      por islas de alojamiento de Canarias y periodos.
                    </a>
                  </b>
                </li>
                <li>
                  <b>
                    <a
                      target="_blank"
                      href="https://datos.canarias.es/catalogos/general/dataset/estancia-media-segun-tipos-de-alojamiento-y-paises-de-residencia-islas-de-canarias-y-periodos1"
                      rel="noreferrer"
                    >
                      Estancia media según tipos de alojamiento y países de
                      residencia. Islas de Canarias y periodos.
                    </a>
                  </b>
                </li>
              </ul>
            </Container>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default TouristStayContent;
