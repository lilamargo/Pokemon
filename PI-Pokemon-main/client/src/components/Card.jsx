import React from "react";
import stilos from "./Card.module.css";

export default function Card({ name, image, tipo }) {
  return (
    <div className={stilos.container}>
      <img src={image} alt="" width="70px" height="60px" key="Imagen" />
      <h3>{name}</h3>
      <h5>{tipo}</h5>
    </div>
  );
}
