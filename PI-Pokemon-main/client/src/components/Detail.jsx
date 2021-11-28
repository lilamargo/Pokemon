import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]); // QUITAR props.match.params.id PORQUE PUEDE QUE CAUSE PROBLEMAS, SELE NO LO PUSO

  const myPokemon = useSelector((state) => state.detail);
  return (
    <div>
      {myPokemon.length > 0 ? (
        <div>
          <h1>My name is {myPokemon[0].name}</h1>
          <img
            src={myPokemon[0].image ? myPokemon[0].image : myPokemon[0].img}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>ID Number: {myPokemon[0].id}</h2>
          <h2>Hit Point: {myPokemon[0].hp}</h2>
          <h2>Attack: {myPokemon[0].attack}</h2>
          <h2>Defense: {myPokemon[0].defense}</h2>
          <h2>Speed: {myPokemon[0].speed}</h2>
          <h2>Height: {myPokemon[0].height}</h2>
          <h2>Weight: {myPokemon[0].weight}</h2>
          <h2>Type(s): {myPokemon[0].tipo.map((el) => el.name + " ")}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
