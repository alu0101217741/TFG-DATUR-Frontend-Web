import React from "react";
import Card from "./Card";
import "./CardsGroup.css";

function CardsGroup() {
  return (
    <div className="cards">
      <h1>Estas son nuestras secciones</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Card
              src="images/touristNumberAndNationalities.jpg"
              text="Explore the hidden waterfall deep inside the Amazon Jungle"
              label="Adventure"
              path="/services"
            />
            <Card
              src="images/touristNumberAndNationalities.jpg"
              text="Travel through the Islands of Bali in a Private Cruise"
              label="Luxury"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <Card
              src="images/touristNumberAndNationalities.jpg"
              text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
              label="Mystery"
              path="/services"
            />
            <Card
              src="images/touristNumberAndNationalities.jpg"
              text="Experience Football on Top of the Himilayan Mountains"
              label="Adventure"
              path="/products"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsGroup;
