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
              label="Instituto Canario de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/numero-de-turistas-y-nacionalidades"
            />
            <Card
              src="images/tourist-spending.jpg"
              title="Gasto turístico"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Canario de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/gasto-turistico"
            />
          </ul>
          <ul className="cards-items">
            <Card
              src="images/touristStay.jpg"
              title="Estancia turística"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Canario de Estadística"
              details="Actualización estimada de los datos: mensual"
              path="/estancia-turistica"
            />
            <Card
              src="images/img-header-energy-data.png"
              title="Expectativas turísticas"
              text="Conoce el número de turistas y nacionalidades que visitan las Islas Canarias, incluyendo su evolución a lo largo de los años y un clasificación por islas."
              label="Instituto Canario de Estadística"
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
