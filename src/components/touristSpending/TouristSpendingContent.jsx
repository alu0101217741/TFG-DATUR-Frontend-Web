import React from "react";
import { Container } from "react-bootstrap";

function TouristSpendingContent() {
  return (
    <div>
      <Container className="mt-4 text-style link-style">
        <Container>
          <h2 className="section-title">Información de la sección</h2>
          <Container>
            <p className="mt-4 text-start text-wrap">
              Esta sección pretende aportar un conocimiento total sobre el gasto
              que realizan los turistas en sus viajes a las Islas Canarias, a
              través de gráficas que visualizan la evolución del gasto y su
              desglose en conceptos (alojamiento, transporte, alimentación,
              compras, etc). Para generar estas gráficas se han procesado los
              siguientes datasets del repositorio &nbsp;
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
                    href="https://datos.canarias.es/catalogos/general/dataset/gastos-medios-incluyendo-desgloses-del-gasto-segun-paises-de-residencia-por-islas-de-canarias-y1"
                    rel="noreferrer"
                  >
                    Gastos medios, incluyendo desgloses del gasto, según países
                    de residencia por islas de Canarias y periodos.
                  </a>
                </b>
              </li>
              <li>
                <b>
                  <a
                    target="_blank"
                    href="https://datos.canarias.es/catalogos/general/dataset/gasto-turistico-total-segun-nacionalidades-por-periodos1-1"
                    rel="noreferrer"
                  >
                    Gasto turístico total según nacionalidades por periodos.
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

export default TouristSpendingContent;
