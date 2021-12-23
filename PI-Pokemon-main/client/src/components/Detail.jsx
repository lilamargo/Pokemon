import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";
import { useEffect } from "react";
import estilos from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(3);
  });
  useEffect(() => {
    dispatch(getDetails(props.id));
  }, [dispatch, props.id]); // AGREGARRRRRRR props.match.params.id PORQUE PUEDE QUE CAUSE PROBLEMAS, SELE NO LO PUSO

  const myPokemon = useSelector((state) => state.detail);
  const handleClose = (e) => {
    e.preventDefault();
    props.display(false);
  };
  return (
    <div className={estilos.body}>
      {myPokemon.length > 0 && (
        <div className={estilos.container}>
          <div className={estilos.titulo}>
            <h1>{myPokemon[0].name}</h1>
            <div className={estilos.gridAbajo}>
              <div>
                <span className={estilos.id}>
                  <h2>ID Number: {myPokemon[0].id}</h2>
                </span>
              </div>
            </div>

            <div>
              <div className={estilos.description}>
                <h3>{myPokemon[0].description}</h3>
              </div>
            </div>
            <div className={estilos.grid}>
              <div className={estilos.stats}>
                <h2>Hit Point: {myPokemon[0].hp}</h2>
                <h2>Attack: {myPokemon[0].attack}</h2>
                <h2>Defense: {myPokemon[0].defense}</h2>
                <h2>Speed: {myPokemon[0].speed}</h2>
                <h2>Height: {myPokemon[0].height + " m"}</h2>
                <h2>Weight: {myPokemon[0].weight + " kg"}</h2>
                <h2>Type(s): {myPokemon[0].tipo.map((el) => el.name + " ")}</h2>
              </div>
              <div>
                <img
                  src={
                    myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img
                  }
                  alt="pokemon"
                  className={estilos.imagen}
                />
              </div>
            </div>
          </div>
          <div>
            <button className={estilos.btn} onClick={(e) => handleClose(e)}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
