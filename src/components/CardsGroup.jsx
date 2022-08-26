import React from "react";
import Card from "./Card";
import "./CardsGroup.css";

function CardsGroup() {
  return (
    <div className="cards">
      <h1>Nuestras secciones</h1>
      <div className="cards-container">
        <div className="cards-wrapper">
          <ul className="cards-items">
            <Card
              src="images/touristNumberAndNationalities.jpg"
              title="Número de turistas"
              text="Conoce el número de turistas que visitan las Islas Canarias, incluyendo su evolución, nacionalidades y distribución por islas."
              label="Instituto Canario de Estadística"
              details="Actualización estimada: mensual"
              path="/numero-de-turistas"
            />
            <Card
              src="images/tourist-spending.jpg"
              title="Gasto turístico"
              text="Observa la evolución del gasto turístico por año y trimestre, con un desglose del gasto por conceptos."
              label="Instituto Canario de Estadística"
              details="Actualización estimada: mensual"
              path="/gasto-turistico"
            />
          </ul>
          <ul className="cards-items">
            <Card
              src="images/touristStay.jpg"
              title="Estancia turística"
              text="Infórmate sobre la estancia media de los turistas, teniendo en cuenta el año, lugar de residencia, isla y tipo de alojamiento."
              label="Instituto Canario de Estadística"
              details="Actualización estimada: mensual"
              path="/estancia-turistica"
            />
            <Card
              src="images/img-header-energy-data.png"
              title="Expectativas turísticas"
              text="Consigue una visión del futuro del sector turístico, a través de las expectativas del grado de ocupación y la marcha del negocio."
              label="Instituto Canario de Estadística"
              details="Actualización estimada: mensual"
              path="/expectativas-turisticas"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsGroup;
