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
              title="Número turistas y nacionalidades"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Nacional de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/services"
            />
            <Card
              src="images/tourist-spending.jpg"
              title="Gasto turístico"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Nacional de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/services"
            />
          </ul>
          <ul className="cards-items">
            <Card
              src="images/touristStay.jpg"
              title="Estancia turística"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Nacional de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/services"
            />
            <Card
              src="images/touristNumberAndNationalities.jpg"
              title="Expectativas turísticas"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Nacional de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/products"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsGroup;
