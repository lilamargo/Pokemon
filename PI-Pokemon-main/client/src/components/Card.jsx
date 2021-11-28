import React from "react";

export default function Card({ name, image, tipo }) {
  return (
    <div>
      <img src={image} alt="Imagen Not Found" width="80px" height="70px" />
      <h3>{name ? name : "POKEMON NO ENCONTRADO"}</h3>
      <h5>{tipo}</h5>
    </div>
  );
}
