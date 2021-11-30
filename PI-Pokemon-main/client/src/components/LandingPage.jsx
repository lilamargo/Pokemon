import React from "react";
import { Link } from "react-router-dom";
import estilos from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={estilos.container}>
      <Link to="/home">
        <button className={estilos.btn}>S T A R T</button>
      </Link>
    </div>
  );
}
