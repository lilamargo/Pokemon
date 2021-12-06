import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import grid from "./Cards.module.css";
import not from "../recursos/not.gif";

export default function Cards({ currentPokemones }) {
  return (
    <div className={grid.parent}>
      {currentPokemones?.map((el) => {
        return (
          <>
            <Link to={"/home/" + el.id} key={el.id}>
              <Card
                name={el.name ? el.name : "Not Found"}
                image={el.image ? el.image : not}
                tipo={el.tipo?.map((n) => n.name + " ")}
              />
            </Link>
          </>
        );
      })}
    </div>
  );
}
