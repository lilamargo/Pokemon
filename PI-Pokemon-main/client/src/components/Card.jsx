import React from "react";
import stilos from "./Card.module.css";

export default function Card({ name, image, tipo, attack }) {
  return (
    <div className={stilos.container}>
      <img src={image} alt="" key="Imagen" data-testid="image" />
      <div className={stilos.container2}>
        <h3 className={stilos.hname} data-testid="name">
          {name}
        </h3>
        <div className={stilos.htipo}>
          <ul>
            <li>
              <h4>{tipo}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
