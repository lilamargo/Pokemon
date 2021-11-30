import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import grid from "./Cards.module.css";

export default function Cards({ currentPokemones }) {
  return (
    <div className={grid.parent}>
      {currentPokemones?.map((el) => {
        return (
          <>
            <Link to={"/home/" + el.id}>
              <Card
                name={el.name}
                image={
                  el.image ? (
                    el.image
                  ) : (
                    <img
                      src="https://forums.pokemmo.eu/uploads/monthly_2020_10/1392966187789.gif.8f8685345a400e0e5d6ca3c2a1aba734.gif"
                      alt=""
                      key={el.id}
                    />
                  )
                }
                tipo={el.tipo?.map((n) => n.name + " ")}
              />
            </Link>
          </>
        );
      })}
    </div>
  );
}
