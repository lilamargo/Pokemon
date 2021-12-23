import React, { useState } from "react";
import Card from "./Card";
import grid from "./Cards.module.css";
import not from "../recursos/not.gif";
import Detail from "./Detail";

export default function Cards({ currentPokemones }) {
  const [displayDetail, setDisplayDetail] = useState(false);
  const [id, setId] = useState("");
  return (
    <div className={grid.parent}>
      {currentPokemones?.map((el) => {
        return (
          <>
            <p
              onClick={() => {
                setDisplayDetail(!displayDetail);
                setId(el.id);
              }}
            >
              <Card
                name={el.name ? el.name : "Not Found"}
                image={el.image ? el.image : not}
                tipo={el.tipo?.map((n) => n.name + " ")}
              />
            </p>
          </>
        );
      })}
      {displayDetail && <Detail id={id} display={setDisplayDetail} />}
    </div>
  );
}
