import React from "react";
import stilos from "./Card.module.css";

export default function Card({ name, image, tipo }) {
  return (
    <div className={stilos.container}>
      <img src={image} alt="Imagen Not Found" width="80px" height="70px" />
      <h3>{name ? name : "Pokemon Not Found"}</h3>
      <h5>{tipo}</h5>
    </div>
  );
}
