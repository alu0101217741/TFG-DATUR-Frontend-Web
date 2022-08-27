import React from "react";
import { Container } from "react-bootstrap";

function TouristExpectationsContent() {
  return (
    <div>
      <Container className="mt-4 text-style link-style">
        <Container>
          <h2 className="section-title">Información de la sección</h2>
          <Container>
            <p className="mt-4 text-start text-wrap">
              En esta sección se ofrece una visión sobre el futuro del sector
              turístico canario, a través de una serie de expectativas basadas
              en las opiniones de los gestores de los establecimientos hoteleros
              de Canarias. Estas expectativas se centran en el grado de
              ocupación y en la marcha del negocio. Para generar estas gráficas
              se han procesado los siguientes datasets del repositorio &nbsp;
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
                    href="https://datos.canarias.es/catalogos/general/dataset/balance-de-situacion-balance-de-expectativas-e-indices-de-confianza-hotelera-por-islas-de-canar1"
                    rel="noreferrer"
                  >
                    Balance de situación, balance de expectativas e índices de
                    confianza hotelera por islas de Canarias y periodos.
                  </a>
                </b>
              </li>
              <li>
                <b>
                  <a
                    target="_blank"
                    href="https://datos.canarias.es/catalogos/general/dataset/expectativas-de-la-marcha-del-negocio-respecto-al-trimestre-anterior-segun-categorias-de-los-es1"
                    rel="noreferrer"
                  >
                    Expectativas de la marcha del negocio respecto al trimestre
                    anterior según categorías de los establecimientos por islas
                    de Canarias y periodos.
                  </a>
                </b>
              </li>
              <li>
                <b>
                  <a
                    target="_blank"
                    href="https://datos.canarias.es/catalogos/general/dataset/expectativas-de-los-principales-factores-de-la-marcha-del-negocio-respecto-a-otros-trimestres-s1"
                    rel="noreferrer"
                  >
                    Expectativas de los principales factores de la marcha del
                    negocio respecto a otros trimestres según categorías de los
                    establecimiento por islas de Canarias y periodos.
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

export default TouristExpectationsContent;
