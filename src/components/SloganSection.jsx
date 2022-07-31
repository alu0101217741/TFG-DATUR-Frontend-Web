import React from "react";
import "./SloganSection.css";

function SloganSection() {
  return (
    <div className="slogan-container">
      <video src="/videos/sloganVideo.mp4" autoPlay loop muted />
      <h1>El turismo de Canarias en datos</h1>
      <p>
        Infórmate sobre los últimos datos relacionados con el turismo en las
        islas
      </p>
    </div>
  );
}

export default SloganSection;
