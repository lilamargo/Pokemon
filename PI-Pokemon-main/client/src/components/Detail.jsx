import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";
import { useEffect } from "react";
import loading from "../recursos/loading.gif";
import estilos from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(3);
  });
  useEffect(() => {
    // dispatch(getDetails(props.match.params.id));
    dispatch(getDetails(props.id));
  }, [dispatch, props.id]); // AGREGARRRRRRR props.match.params.id PORQUE PUEDE QUE CAUSE PROBLEMAS, SELE NO LO PUSO

  const myPokemon = useSelector((state) => state.detail);
  const handleClose = (e) => {
    e.preventDefault();
    props.display(false);
  };
  return (
    <div className={estilos.body}>
      {/* <header className={estilos.header}>
        <div className={estilos.logo}>
          <img src={logo} alt="Logo imagen pokemon" />
        </div>
        <nav className={estilos.navmenu}>
          <ul>
            <li>
              <a href="/home" className={estilos.a1}>
                HOME
              </a>
            </li>
            <li>
              <a href="/pokemon" className={estilos.a2}>
                New Pokemon!
              </a>
            </li>
          </ul>
        </nav>
      </header> */}

      {myPokemon.length > 0 && (
        <div className={estilos.container}>
          <div className={estilos.titulo}>
            <h1>{myPokemon[0].name}</h1>
          </div>
          <div>
            <div className={estilos.description}>
              <h3>{myPokemon[0].description}</h3>
            </div>
          </div>
          <div>
            <img
              src={myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img}
              alt=""
              width="250px"
              height="150px"
              align="right"
            />
          </div>

          <div className={estilos.stats}>
            <h2>Hit Point: {myPokemon[0].hp}</h2>
            <h2>Attack: {myPokemon[0].attack}</h2>
            <h2>Defense: {myPokemon[0].defense}</h2>
            <h2>Speed: {myPokemon[0].speed}</h2>
            <h2>Height: {myPokemon[0].height + " m"}</h2>
            <h2>Weight: {myPokemon[0].weight + " kg"}</h2>
            <h2>Type(s): {myPokemon[0].tipo.map((el) => el.name + " ")}</h2>
          </div>
          <span className={estilos.id}>
            <h2>ID Number: {myPokemon[0].id}</h2>
          </span>
          <button className={estilos.btn} onClick={(e) => handleClose(e)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
