import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";
import { useEffect } from "react";
import loading from "../recursos/loading.gif";
import estilos from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]); // QUITAR props.match.params.id PORQUE PUEDE QUE CAUSE PROBLEMAS, SELE NO LO PUSO

  const myPokemon = useSelector((state) => state.detail);
  return (
    <div>
      <div>
        <Link to="/home">
          <button className={estilos.btn}>Return</button>
        </Link>
      </div>

      {myPokemon.length > 0 ? (
        <div className={estilos.container}>
          <div>
            <h1>{myPokemon[0].name}</h1>
            <h3>{myPokemon[0].description}</h3>
          </div>
          <div>
            <div>
              <img
                src={myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img}
                alt=""
                width="500px"
                height="300px"
                align="right"
              />
            </div>
            <div className={estilos.divdetalle}>
              <h2>ID Number: {myPokemon[0].id}</h2>
              <h2>Hit Point: {myPokemon[0].hp}</h2>
              <h2>Attack: {myPokemon[0].attack}</h2>
              <h2>Defense: {myPokemon[0].defense}</h2>
              <h2>Speed: {myPokemon[0].speed}</h2>
              <h2>Height: {myPokemon[0].height + " m"}</h2>
              <h2>Weight: {myPokemon[0].weight + " kg"}</h2>
              <h2>Type(s): {myPokemon[0].tipo.map((el) => el.name + " ")}</h2>
            </div>
          </div>
        </div>
      ) : (
        <img src={loading} alt="loaging gif" />
      )}
    </div>
  );
}
