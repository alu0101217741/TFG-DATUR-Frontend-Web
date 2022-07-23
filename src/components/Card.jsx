import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
      <li className="cards-item">
        <Link className="cards-item-link" to={props.path}>
          <figure className="cards-item-pic-wrap" data-category={props.label}>
            <img className="cards-item-img" alt="Travel" src={props.src} />
          </figure>
          <div className="cards-item-info">
            <h2 className="cards-item-title">{props.title}</h2>
            <p className="cards-item-text">{props.text}</p>
            <p className="cards-item-details">{props.details}</p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default Card;
